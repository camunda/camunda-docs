---
id: es-restore
title: "Restore Zeebe with the legacy restore application (Elasticsearch/OpenSearch)"
sidebar_label: "Elasticsearch/OpenSearch restore"
keywords:
  ["backup", "backups", "restore", "elasticsearch", "opensearch", "legacy"]
description: "Restore Zeebe using the deprecated standalone restore application with Elasticsearch or OpenSearch as secondary storage."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore Zeebe using the deprecated standalone restore application after restoring Elasticsearch or OpenSearch snapshots with the [Elasticsearch/OpenSearch restore procedure](./es-os-restore.md).

:::note Deprecated restore procedure
The [in-process restore](../in-process-restore.md) guide is recommended. Use this page only when in-process restore is unavailable for your Camunda version or deployment.
:::

## Prerequisites

Before starting the legacy restore application:

- Restore Elasticsearch or OpenSearch by following the [Elasticsearch/OpenSearch restore procedure](./es-os-restore.md).
- Stop all Camunda components.
- Configure Zeebe with the same backup store that contains the primary storage backup.
- Use the same node ID, data directory, cluster size, replication count, and partition count as the target broker configuration.
- Clear the Zeebe data directory before restoring.

## Restore Zeebe with the standalone application

Run the restore application on each node where a Zeebe Broker will run.

Use one of the following approaches to configure the restore application.

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
orchestration:
  enabled: true
  env:
    # Environment variables to overwrite the Zeebe startup behavior
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_FROM_BACKUP_ID
      value: "$BACKUP_ID" # Change the $BACKUP_ID to your actual value
    # all the envs related to the backup store as outlined in the prerequisites
    - name: CAMUNDA_DATA_BACKUP_STORE
      value: "S3" # just as an example
    - name: CAMUNDA_DATA_BACKUP_REPOSITORYNAME
      value: camunda # Change to name of the repository in Elasticsearch/OpenSearch
    ...

# If you use Elasticsearch from the embedded Helm chart, set this to true. Otherwise, set it to false.
elasticsearch:
  enabled: true
connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="command" label="Command override">

As an alternative, override the command used to start the Orchestration Cluster:

```yaml
orchestration:
  enabled: true
  command:
    - "/usr/local/camunda/bin/restore"
    - "--backupId=$BACKUP_ID" # Change the $BACKUP_ID to your actual value.
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
   # All the envs related to the backup store as outlined in the prerequisites
   ...
```

  </TabItem>
</Tabs>

## Restore Physical Tenant data

The restore application targets the `default` Physical Tenant unless you specify another scope. Use the following arguments with the command override or CLI approach. For Kubernetes, set the corresponding environment variables in the Orchestration Cluster Helm values:

| Restore option | Helm variable                  | CLI option              | Description                                                |
| :------------- | :----------------------------- | :---------------------- | :--------------------------------------------------------- |
| Tenant ID      | `ZEEBE_RESTORE_TENANT_ID`      | `--tenantId=<tenantId>` | Restores the specified Physical Tenant.                    |
| All tenants    | `ZEEBE_RESTORE_ALL_TENANTS`    | `--allTenants`          | Restores all Physical Tenants in a cluster-wide operation. |
| Backup ID      | `ZEEBE_RESTORE_FROM_BACKUP_ID` | `--backupId=<backupId>` | Restores the specified backup ID.                          |

Use `--tenantId` when restoring one Physical Tenant. Use `--allTenants` when restoring all Physical Tenants. With `--allTenants`, use the `--override.<tenantX>...` arguments to select different restore parameters for individual Physical Tenants.

The restore application exits after restoring the broker data. A Kubernetes pod can appear as `CrashLoopBackOff` after the successful restore because Kubernetes restarts the completed restore process.

When performing a cluster-wide restore, there is the option to provide overrides for specific tenants. To do so they must be supplied through an additional configuration file as follows:

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
orchestration:
  env:
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_ALL_TENANTS
      value: "true"
    - name: ZEEBE_RESTORE_FROM_BACKUP_ID
      value: "$BACKUP_ID"

  extraConfiguration:
    - file: restore-overrides.yaml
      content: |
        override:
          tenanta:
            backupId: ["$TENANT_A_BACKUP_ID"]
          tenantb:
            backupId: ["$TENANT_B_BACKUP_ID"]
```

  </TabItem>
  <TabItem value="command" label="Command override">

```yaml
orchestration:
  enabled: true
  command:
    - "/usr/local/camunda/bin/restore"
    - "--backupId=$BACKUP_ID"
    - "--allTenants"
    - "--override.tenanta.backupId=$TENANT_A_BACKUP_ID"
    - "--override.tenantb.backupId=$TENANT_B_BACKUP_ID"
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
   # All the envs related to the backup store as outlined in the prerequisites
   ...
```

  </TabItem>
</Tabs>

With the above configuration, a cluster-wide restore will be executed applying _$BACKUP_ID_ to the `default` tenant, _$TENANT_A_BACKUP_ID_ to `tenanta` and _$TENANT_B_BACKUP_ID_ to `tenantb`.

## Return to normal startup

Remove the temporary restore command and restore-only environment variables. For Kubernetes, set `ZEEBE_RESTORE=false` and deploy the normal broker configuration. For a manual deployment, start the broker and other Camunda components normally.

The restore succeeds when the application logs `Successfully restored broker from backup`. If it fails, verify the backup store configuration, the backup ID, the partition count, and that the data directory is empty before retrying.
