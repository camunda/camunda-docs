---
id: rdbms-restore
title: "Restore a backup (RDBMS)"
sidebar_label: "Restore a backup"
keywords:
  [
    "backup",
    "backups",
    "restore",
    "rdbms",
    "postgresql",
    "mariadb",
    "oracle",
    "sql server",
    "mysql",
    "time range restore",
    "point in time restore",
    "backup range",
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup using a relational database, including all restore options and RDBMS-aware restore."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore a previous backup of your Camunda 8 Self-Managed Orchestration cluster components (Zeebe, Operate, and Tasklist) when using a relational database management system (RDBMS) as secondary storage.

## How RDBMS restore works

As described in the [architecture overview](./backup.md#architecture-overview), backups involve two independent systems: **primary storage backups** (Zeebe's log stream and snapshots in a blob store) and the **secondary storage backup** (the RDBMS).

During restore, Zeebe reads the **exporter position** from the restored RDBMS — the last log stream position that was successfully exported — and uses it to determine which primary storage backup, or backups, to restore from. This ensures that Zeebe's state is at least as advanced as what the RDBMS contains. After restart, Zeebe re-exports any events between the RDBMS position and its restored checkpoint position, bringing the secondary storage up to date.

## Restore process overview

1. **Ensure all [prerequisites](#prerequisites) are met** — all Camunda components are stopped.
2. RDBMS has been restored.
3. **Restore Zeebe** from its primary storage backup using one of the [restore options](#restore-options).
4. **Start all Camunda components.**

## Prerequisites

The following prerequisites are required before you can restore a backup:

| Prerequisite       | Description                                                                                                                                                                                   |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda version    | Backups can be restored using the same Camunda version they were created with, or up to one minor version newer. For example, a backup taken with 8.9.x can be restored with 8.9.x or 8.10.x. |
| RDBMS restored     | You have already restored the RDBMS from its backup using your database vendor's native tools. The restored database must contain the entire Camunda schema.                                  |
| Backup available   | At least one Zeebe primary storage backup is available in the configured blob store. See [Create a backup](./backup.md).                                                                      |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).                                                                               |
| Components stopped | All Camunda components (Zeebe, Operate, Tasklist, Optimize, Connectors) must be stopped before starting the restore process.                                                                  |

:::warning
It is critical that no Camunda components are running during the restore. Running components may propagate an incorrect cluster configuration, potentially disrupting cluster communication and data consistency.
:::

## Step 1: Restore Zeebe from its primary storage backup

Camunda provides a standalone restore application that must be run on each node where a Zeebe broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured — via environment variables or using the configuration file located in `config/application.yaml`.

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

| Restore option                                    | Parameters             | Use case                                                                                       |
| :------------------------------------------------ | :--------------------- | :--------------------------------------------------------------------------------------------- |
| [Default restore](#default-restore) (recommended) | No parameters required | Restores as much data as possible from the latest available backup range.                      |
| [Point-in-time restore](#point-in-time-restore)   | `--to`                 | Restores to a specific point in time.                                                          |
| [Time range restore](#time-range-restore)         | `--from` and `--to`    | Constrains the search to a specific backup range. Useful when automatic matching doesn't work. |
| [Backup ID restore](#backup-id-restore)           | `--backupId=<id>`      | Escape hatch to restore from a specific backup ID. Use at your own risk.                       |

:::note
`--backupId` is mutually exclusive with `--from`/`--to`. Specifying both will result in error.
:::

---

### Default restore

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
    - name: CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE
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
export CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE=S3
# ... other store config

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore
```

  </TabItem>
</Tabs>

---

### Point-in-time restore

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
    - name: CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE
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

---

### Time range restore

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
    - name: CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE
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

---

### Backup ID restore

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
    - name: CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE
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
    ["/usr/local/camunda/bin/restore", "--backupId=1772001869309,1772001899400"]
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

---

### Kubernetes-specific behavior

When restoring in Kubernetes using the official [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md), there are specific behaviors to be aware of.

:::note Alternative startup override

An alternative approach to overwriting the startup behavior to restore the partitions:

```yaml
orchestration:
  enabled: true
  command: ["/usr/local/camunda/bin/restore"]
  env:
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
  # all the envs related to the backup store as above
```

:::

The application exits after restore and Kubernetes restarts the pod, which appears as `CrashLoopBackOff`. This is expected behavior. The restore application does not restore state again once partitions are already restored to persistent disk.

After removing the temporary restore command or unsetting `ZEEBE_RESTORE` to restore Zeebe's default behavior, you may optionally restart the StatefulSet to ensure the changes take effect immediately. This can be done by [scaling](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) the StatefulSet down and back up, or by [deleting](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/) the pods so they are recreated with the newly deployed revision.

:::tip
In Kubernetes, Zeebe runs as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which is intended for long-running, persistent applications. Because StatefulSet pods are restarted automatically, restore-mode pods can appear in `CrashLoopBackOff` after a successful restore. Observe Zeebe broker logs during restore. If a pod has already restarted, use `--previous` to view logs from the completed restore run:

```bash
kubectl logs <zeebe-pod-name> --previous
```

The restore app will not import or overwrite data again, but you may miss the first successful run if you are not observing logs actively.
:::

## Restore success or failure

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

### Data directory is not empty

If the data directory is not empty, the restore will fail with an error message:

```
Broker's data directory /usr/local/zeebe/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted. In such cases, the restore application can be configured to ignore the presence of these files and folders. The configuration option `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore. By default, it ignores the `lost+found` folder found on ext4 filesystems. To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.

## Step 2: Start all Camunda 8 components {#start-all-camunda-8-components}

After both primary and secondary storage are restored, start all Camunda components. Ensure all components are configured to use the restored database instance and that the configuration matches the original deployment.

:::note
After starting the components, monitor the logs for any errors or warnings. Components will reconcile their state with the restored data, which may take some time depending on the size of the data. When using RDBMS-aware or time range restore, Zeebe re-exports events from the backup's checkpoint position up to its current state, bringing the RDBMS up to date.
:::

## (Optional) Restore Optimize data {#restore-optimize-data}

If you previously backed up Optimize data, restore it independently using the standalone Optimize restore procedure. Optimize can be restored while the Orchestration Cluster restore is in progress or after it completes — the two are independent.

See [back up and restore Optimize (standalone)](../optimize-backup-and-restore.md#restore-a-backup) for the complete procedure.

## (Optional) Restore Web Modeler data

If you previously backed up Web Modeler data, restore it using the same RDBMS restore tools.

See [backup and restore Web Modeler data](../modeler-backup-and-restore.md) for more details.
