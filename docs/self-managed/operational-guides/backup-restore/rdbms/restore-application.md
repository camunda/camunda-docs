---
id: rdbms-restore-application
title: "Restore a backup with the Restore Application (RDBMS)"
sidebar_label: "Restore Application (legacy)"
keywords:
  [
    "backup",
    "backups",
    "restore",
    "restore application",
    "rdbms",
    "time range restore",
    "point in time restore",
    "backup range",
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup with the legacy Zeebe Restore Application when using a relational database, including all restore options."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import KubernetesBehavior from '../\_partials/\_restore-app-kubernetes-behavior.md';
import DataDirectory from '../\_partials/\_restore-app-data-directory.md';
import PhysicalTenants from '../\_partials/\_restore-app-physical-tenants.md';
import RestoreOptimize from '../\_partials/\_restore-optimize-data.md';
import RestoreHub from '../\_partials/\_restore-camunda-hub-data.md';

Restore Zeebe partition data with the legacy Restore Application, a standalone app that runs on each broker node while all Camunda components are stopped, when using a relational database management system (RDBMS) as secondary storage.

This page is part of the RDBMS [restore procedure](./restore.md). With Camunda 8.10 and later, you can use the [Restore API](./restore-api.md) instead, which does not require restarting the brokers. To compare the two, see [choosing a restore approach](../backup-and-restore.md#choosing-a-restore-approach).

After you ensure all [prerequisites](#prerequisites) are met, the procedure consists of the following steps:

1. [Stop all Camunda components](#stop-all-camunda-components).
2. [Restore the RDBMS](#restore-rdbms) using your database vendor's native tools.
3. [Restore Zeebe](#restore-zeebe) from its primary storage backup using one of the [restore options](#restore-options).
4. [Start all Camunda 8 components](#start-all-camunda-8-components).

## Prerequisites

The following prerequisites are required before you can restore a backup:

| Prerequisite     | Description                                                                                                                                                                                   |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version  | Backups can be restored using the same Camunda version they were created with, or up to one minor version newer. For example, a backup taken with 8.9.x can be restored with 8.9.x or 8.10.x. |
| Backup available | At least one Zeebe primary storage backup is available in the configured blob store. See [Create a backup](./backup.md).                                                                      |
| Backup storage   | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).                                                                               |

## 1. Stop all Camunda components {#stop-all-camunda-components}

Stop all Camunda components (Zeebe, Operate, Tasklist, Optimize, Connectors) before starting the restore process.

:::warning
It is critical that no Camunda components are running during the restore. Running components may propagate an incorrect cluster configuration, potentially disrupting cluster communication and data consistency.
:::

## 2. Restore the RDBMS {#restore-rdbms}

Restore the RDBMS from its backup using your database vendor's native tools. The restored database must contain the entire Camunda schema.

Skip this step if the RDBMS was already restored another way, for example as part of a wider disaster recovery procedure.

Complete this step before you restore Zeebe. Each restore option below reads the exporter position from the restored RDBMS to determine which primary storage backup to restore from, so the RDBMS must already be in its target state.

## 3. Restore Zeebe from its primary storage backup {#restore-zeebe}

Camunda provides a standalone restore application that must be run on each node where a Zeebe Broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured — via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
Persistent volumes or disks must not contain any pre-existing data before restoring Zeebe. If data exists from a previous deployment, it must be cleared first.
:::

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running on this node. The partition count **must be the same** as in the backup.

The number of partitions backed up is also visible via the [backup management API](../zeebe-backup-and-restore.md#list-backups-api).
If brokers were dynamically scaled between backup and restore, this is not an issue — as long as the partition count remains unchanged.
:::

### Restore options

There are four restore options. In all cases, the restore app reads the exporter position from the restored RDBMS to ensure consistency between primary and secondary storage.

:::note
`--backupId` is mutually exclusive with `--from`/`--to`. Specifying both will result in error.
:::

<Tabs groupId="rdbms-legacy-restore-options">
<TabItem value="default" label="Default" default>

**This is the recommended restore option.** No additional parameters are required — the restore application automatically determines the best backup to use.

The restore app reads the exporter position from the restored RDBMS for each partition and identifies the most recent backup taken before that position. It then applies all subsequent backups in the range, restoring up to the latest available backup.

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3" # or GCS, AZURE, FILESYSTEM
    # Rest of the backup store configuration (bucket, region, etc.)
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the RDBMS configuration (URL, username, password)

connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="manual" label="Manual">

```bash
# Ensure RDBMS configuration is set (URL, credentials, etc.)
export CAMUNDA_DATA_SECONDARY_STORAGE_TYPE=rdbms
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://localhost:5432/camunda"
# ... other RDBMS config

# Ensure backup store is configured
export CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE=S3
# ... other store config

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore
```

  </TabItem>
</Tabs>

</TabItem>
<TabItem value="point-in-time" label="Point-in-time">

Restore Zeebe to a specific point in time using `--to`. The restore app finds the closest backup to the provided timestamp. The configured [checkpoint interval](./backup.md#checkpoint-interval) determines how fine-grained the restore points are.

Use the [backup state actuator](../zeebe-backup-and-restore.md#request-runtime-state) to inspect available backup ranges.

<Tabs>
  <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "2026-01-10T14:00:00Z"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3"
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the secondary storage configuration

connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="cli" label="Command line">

```bash
export ZEEBE_RESTORE_TO_TIMESTAMP=2026-01-10T14:00:00Z

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --to="${ZEEBE_RESTORE_TO_TIMESTAMP}"
```

  </TabItem>
</Tabs>

:::warning
The `--to` timestamp must not be before the restored state of the RDBMS. If it is, the secondary storage would be ahead of the primary storage and the restore will fail.
:::

</TabItem>
<TabItem value="time-range" label="Time range">

Constrain the restore to a specific backup range by specifying both `--from` and `--to`. This is useful if automatic matching did not work.

The restore app finds a backup range whose start is at or before `--from` and whose end is at or after `--to`, then restores to the checkpoint closest to `--to`.

<Tabs>
  <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_FROM_TIMESTAMP
      value: "2026-01-10T13:00:00Z"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "2026-01-10T14:00:00Z"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3"
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the secondary storage configuration

connectors:
  enabled: false
optimize:
  enabled: false
```

  </TabItem>
  <TabItem value="cli" label="Command line">

```bash
export ZEEBE_RESTORE_FROM_TIMESTAMP=2026-01-10T13:00:00Z
export ZEEBE_RESTORE_TO_TIMESTAMP=2026-01-10T14:00:00Z

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --from="${ZEEBE_RESTORE_FROM_TIMESTAMP}" --to="${ZEEBE_RESTORE_TO_TIMESTAMP}"
```

  </TabItem>
</Tabs>

:::warning
The `--to` timestamp must not be before the restored state of the RDBMS. If it is, the secondary storage would be ahead of the primary storage and the restore will fail.
:::

</TabItem>
<TabItem value="backup-id" label="Backup ID">

Restore from one or more specific backup IDs directly. Multiple IDs can be provided as a comma-separated list. This is an escape hatch for situations where the automatic matching does not work. Use at your own risk — you are responsible for ensuring that the backups are compatible with the restored RDBMS state.

<Tabs>
  <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: CAMUNDA_DATA_PRIMARYSTORAGE_BACKUP_STORE
      value: "S3"
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
    # Rest of the secondary storage configuration

connectors:
  enabled: false
optimize:
  enabled: false
```

With the backup ID passed as a command-line argument:

```yaml
orchestration:
  command:
    - "/usr/local/camunda/bin/restore"
    - "--backupId=1772001869309,1772001899400"
```

  </TabItem>
  <TabItem value="cli" label="Command line">

```bash
mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --backupId=1772001869309,1772001899400
```

  </TabItem>
</Tabs>

:::caution
When using backup ID restore, the RDBMS exporter position is not consulted. You must ensure that the provided backups are compatible with the restored RDBMS state.
:::

</TabItem>
</Tabs>

### Kubernetes-specific behavior

When restoring in Kubernetes using the official [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md), there are specific behaviors to be aware of.

:::note Alternative startup override

An alternative approach to overwriting the startup behavior to restore the partitions:

```yaml
orchestration:
  enabled: true
  command:
    - "/usr/local/camunda/bin/restore"
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
  # all the envs related to the backup store as above
```

:::

<KubernetesBehavior />

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
    - name: ZEEBE_RESTORE_FROM_TIMESTAMP
      value: "<TIMESTAMP>"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "<TIMESTAMP>"

  extraConfiguration:
    - file: restore-overrides.yaml
      content: |
        override:
          tenanta:
            from: "<TIMESTAMP>"
            to: "<TIMESTAMP>"
          tenantb:
            backupId: [32]
```

</TabItem>

<TabItem value="cli" label="CLI arguments">

```bash
./camunda/bin/restore \
  --allTenants \
  --backupId=1748937221 \
  --override.tenanta.from=<TIMESTAMP> --override.tenanta.to=<TIMESTAMP> \
  --override.tenantb.backupId=32
```

</TabItem>
</Tabs>

### Restore success or failure

If restore was successful, the app exits with the log message `Successfully restored broker from backup`.

However, the restore will fail if:

- There is no valid backup matching the secondary storage (the exporter position exceeds all available backups).
- There is no valid backup within the specified time range.
- The backup store is not configured correctly.
- The configured data directory is not empty.
- There is a gap in the backup range needed for restore (missing backups between the range start and the required checkpoint).
- The exporter position in the RDBMS is missing for one or more partitions (when using RDBMS-aware restore).
- Due to any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

#### Data directory is not empty

<DataDirectory />

## 4. Start all Camunda 8 components {#start-all-camunda-8-components}

After both primary and secondary storage are restored, start all Camunda components. Ensure all components are configured to use the restored database instance and that the configuration matches the original deployment.

:::note
After starting the components, monitor the logs for any errors or warnings. Components will reconcile their state with the restored data, which may take some time depending on the size of the data. When using RDBMS-aware or time range restore, Zeebe re-exports events from the backup's checkpoint position up to its current state, bringing the RDBMS up to date.
:::

<RestoreOptimize />

<RestoreHub />
