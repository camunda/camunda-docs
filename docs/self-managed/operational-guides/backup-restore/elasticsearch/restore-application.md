---
id: es-restore-application
title: "Restore a backup with the Restore Application"
sidebar_label: "Restore Application (legacy)"
keywords:
  [
    "backup",
    "backups",
    "restore",
    "restore application",
    "elasticsearch",
    "opensearch",
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup with the legacy Zeebe Restore Application when using Elasticsearch or OpenSearch."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import KubernetesBehavior from '../\_partials/\_restore-app-kubernetes-behavior.md';
import DataDirectory from '../\_partials/\_restore-app-data-directory.md';
import PhysicalTenants from '../\_partials/\_restore-app-physical-tenants.md';
import RestoreHub from '../\_partials/\_restore-camunda-hub-data.md';
import RestoreTemplates from '../\_partials/\_es-restore-templates.md';
import FindBackupIdsManual from '../\_partials/\_es-find-backup-ids-manual.md';
import StopComponentsLegacy from '../\_partials/\_es-stop-components-legacy.md';
import DeleteIndices from '../\_partials/\_es-delete-indices.md';
import RestoreSnapshotsAction from '../\_partials/\_es-restore-snapshots-action.md';

Restore Zeebe partition data with the legacy Restore Application, a standalone app that runs on each broker node while all Camunda components are stopped, when using Elasticsearch or OpenSearch as secondary storage.

This page is part of the Elasticsearch/OpenSearch [restore procedure](./restore.md). With Camunda 8.10 and later, you can use the [Restore API](./restore-api.md) instead, which does not require restarting the brokers. To compare the two, see [choosing a restore approach](../backup-and-restore.md#choosing-a-restore-approach).

## Prerequisites

In addition to the [general restore prerequisites](./restore.md#prerequisites), the Restore Application requires the following:

| Prerequisite       | Description                                                                                                                                                                       |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backup storage     | Zeebe and Elasticsearch/OpenSearch are configured with the same backup storage and snapshot repository used to create the backup. See [prerequisites](./backup.md#prerequisites). |
| Sizing             | Elasticsearch/OpenSearch should be sized the same or larger than the original cluster; a smaller cluster can prevent shards from being assigned and fail the restore.             |
| Components stopped | No Camunda component may be running during the restore. A running component can propagate an incorrect cluster configuration and disrupt cluster communication.                   |

## 1. Restore Elasticsearch/OpenSearch snapshots {#restore-es-snapshots-step}

Restore the Elasticsearch/OpenSearch snapshots in five steps, then continue with restoring the Zeebe cluster below.

<RestoreTemplates />

<FindBackupIdsManual />

<StopComponentsLegacy />

<DeleteIndices />

<RestoreSnapshotsAction />

## 2. Restore the Zeebe cluster {#restore-zeebe-cluster}

Restore the Zeebe partitions by running the Restore Application on every node where a Zeebe Broker will run.

:::note
During the restoration of the Elasticsearch / OpenSearch state, we had to temporarily deploy Zeebe. This will have resulted in persistent volumes on Kubernetes and a filled data directory on each Zeebe Broker in case of a manual deployment.

In the case of Kubernetes to remove all related persistent volumes.

```bash
kubectl get pvc -o custom-columns=NAME:.metadata.name --no-headers \
  | grep zeebe \
  | while read pvc; do
      kubectl delete pvc "$pvc"
    done
```

New persistent volumes will be created on a new Camunda Helm chart upgrade and install.

In case of a manual deployment, this means to remove the data directory of each Zeebe Broker.
:::

Camunda provides a standalone app which must be run on each node where a Zeebe Broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count **must be same** as in the backup.

The amount of partitions backed up are also visible in the backup store of Zeebe; see the available backups of Zeebe partitions you found in [step 1](#restore-es-snapshots-step) above.
If brokers were dynamically scaled between backup and restore, this is not an issue - as long as the partition count remains unchanged.
:::

<Tabs>
   <TabItem value="kubernetes" label="Kubernetes" default>

Assuming you're using the official [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md), you'll have to adjust your Helm `values.yml` to supply the following temporarily.

It will overwrite the start command of the resulting Zeebe pod, executing a restore script.
It's important that the backup is configured for Zeebe to be able to restore from the backup!

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

:::note Alternative command overwrite

Use this alternative approach to restore Zeebe partitions:

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

If you're not using the Camunda Helm chart, you can use a similar approach natively with Kubernetes to overwrite the command.
:::

<KubernetesBehavior />

   </TabItem>
   <TabItem value="manual" label="Manual">

To restore a Zeebe Cluster, run the following in each node where the broker will be running:

```bash
mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --backupId=<backupId>
```

   </TabItem>
</Tabs>

### Restoring a cluster with multiple Physical Tenants

<PhysicalTenants />

<Tabs>
<TabItem value="yaml" label="Helm values">

```yaml
orchestration:
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_ALL_TENANTS
      value: "true"
    - name: ZEEBE_RESTORE_FROM_BACKUP_ID
      value: "27"

  extraConfiguration:
    - file: restore-overrides.yaml
      content: |
        override:
          tenanta:
            backupId: [31]
          tenantb:
            backupId: [32]
```

</TabItem>

<TabItem value="cli" label="CLI arguments">

```bash
./camunda/bin/restore \
  --allTenants \
  --backupId=1748937221 \
  --override.tenanta.backupId=31 \
  --override.tenantb.backupId=32
```

</TabItem>
</Tabs>

### Restore success or failure

If restore was successful, the app exits with the log message `Successfully restored broker from backup`.

However, the restore will fail if:

- There is no valid backup with the given backupId.
- The backup store is not configured correctly.
- The configured data directory is not empty.
- Due to any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

#### Data directory is not empty

<DataDirectory />

## 3. Start all Camunda 8 components {#start-all-camunda-8-components}

Now that you have actively restored Elasticsearch/OpenSearch and the Zeebe cluster partitions, you can start all components again and use Camunda 8 as normal.

For example:

- For Kubernetes, apply Helm values for normal startup and explicitly set `ZEEBE_RESTORE=false`. Also, keep your backup-store environment variables configured as outlined in the prerequisites.

```yaml
orchestration:
  enabled: true
  env:
    - name: ZEEBE_RESTORE
      value: "false"
    # all the envs related to the backup store as outlined in the prerequisites
    - name: CAMUNDA_DATA_BACKUP_STORE
      value: "S3" # just as an example
    - name: CAMUNDA_DATA_BACKUP_REPOSITORYNAME
      value: camunda # Change to name of the repository in Elasticsearch/OpenSearch
```

Ensure restore-only settings are not present in this final configuration (for example, `SPRING_PROFILES_ACTIVE=restore`, `ZEEBE_RESTORE_FROM_BACKUP_ID`, or a temporary restore command override).

- For a manual setup, execute the broker and all other components in their normal way.

<RestoreHub />
