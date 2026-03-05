---
id: rdbms-restore
title: "Restore a backup"
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
  ]
description: "Learn how to restore a Camunda 8 Self-Managed backup using a relational database."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Restore a previous backup of your Camunda 8 Self-Managed components and cluster when using a relational database management system (RDBMS) as secondary storage.

## About restoring a backup

When Camunda uses an RDBMS as **secondary storage**, a restore involves **two independent systems**:

- **Zeebe (primary storage)**
- **The external RDBMS used for secondary storage**

## Prerequisites

The following prerequisites are required before you can restore a backup:

| Prerequisite       | Description                                                                                                                  |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| Clean state/data   | The RDBMS instance is set up and running with a clean state (empty database or dedicated restore target).                    |
| Backup available   | You have a valid RDBMS backup and at least one Zeebe backup available. See [Create a backup](./backup.md).                   |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).              |
| Components stopped | All Camunda components (Zeebe, Operate, Tasklist, Optimize, Connectors) must be stopped before starting the restore process. |

:::warning
It is critical that no Camunda components are running during the restore. Running components may propagate an incorrect cluster configuration, potentially disrupting cluster communication and data consistency.
:::

## Restore process

## Step 1: Stop all Camunda components

Before restoring, ensure all Camunda 8 components are stopped. No component should be running during the restore process to avoid data inconsistencies.

## Step 2: Restore the RDBMS backup

Perform the restoration of your RDBMS secondary storage using its official or compatible tools.

## Step 3: Restore Zeebe from its backup

Camunda provides a standalone app which must be run on each node where a Zeebe broker will be running. This is a Spring Boot application similar to the broker and can run using the binary provided as part of the distribution. The app can be configured the same way a broker is configured - via environment variables or using the configuration file located in `config/application.yaml`.

:::warning
Persistent volumes or disks must not contain any pre-existing data before restoring Zeebe. If data exists from a previous deployment, it must be cleared first.
:::

:::warning
When restoring, provide the same configuration (node id, data directory, cluster size, and replication count) as the broker that will be running in this node. The partition count **must be same** as in the backup.

The amount of partitions backed up are also visible in the backup store of Zeebe, see [how to figure out available backups](#available-backups-of-zeebe-partitions).
If brokers were dynamically scaled between backup and restore, this is not an issue - as long as the partition count remains unchanged.
:::

There are two options in terms of what type of how the primary storage is restored. You can either restore to the latest backup or a specified time range. A compatible backup must be available to perform any of the two scenarios.

### Restoring Zeebe

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
   - name: CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE
     value: "S3" # just as an example
  # Rest of the backup store configuration
   - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
     value: "rdbms"
  # Rest of the RDBMS configuration
   ...

connectors:
   enabled: false
optimize:
   enabled: false
```

:::note Alternative overwrite

Alternative approach to overwriting the startup behaviour to restore the partitions.

```yaml
orchestration:
   enabled: true
   command: ["/usr/local/camunda/bin/restore"]
   env:
      - name: SPRING_PROFILES_ACTIVE
        value: "restore"
   # all the envs related to the backup store as above
   ...
```

:::

If you're not using the Camunda Helm chart, you can use a similar approach natively with Kubernetes to overwrite the command.

The application exits after restore and Kubernetes restarts the pod, which appears as `CrashLoopBackOff`. This is expected behavior. The restore application does not restore state again once partitions are already restored to persistent disk.

After removing the temporary restore command or unsetting the `ZEEBE_RESTORE` to restore Zeebe’s default behavior, you may optionally restart the StatefulSet to ensure the changes take effect immediately. This can be done by [scaling](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) the StatefulSet down and back up, or by [deleting](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/) the pods so they are recreated with the newly deployed revision.

:::tip

In Kubernetes, Zeebe runs as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), which is intended for long-running, persistent applications. Because StatefulSet pods are restarted automatically, restore-mode pods can appear in `CrashLoopBackOff` after a successful restore. Observe Zeebe broker logs during restore, and use `--previous` if a pod has already restarted.

The restore app will not import or overwrite data again, but you may miss the first successful run if you are not observing logs actively.

:::

   </TabItem>
   <TabItem value="manual" label="Manual" default>

To restore a Zeebe Cluster, run the following in each node where the broker will be running:

```bash
mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore
```

   </TabItem>
</Tabs>

### Time range restore

Apart from restoring to match your secondary storage, you can restore Zeebe within a specified time window as a point in time restore. The configured backup and checkpoint interval is the factor that determines how fine grained the time window can be. You can find more about configuring the backup scheduler [here](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackup). Using Zeebe's [backup management API](../../zeebe-backup-and-restore/#request-runtime-state) you can get information regarding your active restore window.

To perform a time range restore, you can specify the window that you want the state to be derived from using the `--from` and `--to` command line parameters or, respectively, `ZEEBE_RESTORE_FROM_TIMESTAMP` and `ZEEBE_RESTORE_TO_TIMESTAMP` environment variables. The value of these parameters is an

<Tabs>

    <TabItem value="env" label="Environment variables" default>

```yaml
orchestration:
  enabled: true
  env:
    # Environment variables to overwrite the Zeebe startup behavior
    - name: SPRING_PROFILES_ACTIVE
      value: "restore"
    - name: ZEEBE_RESTORE
      value: "true"
    - name: ZEEBE_RESTORE_FROM_TIMESTAMP
      value: "2026-01-10T13:00:00Z"
    - name: ZEEBE_RESTORE_TO_TIMESTAMP
      value: "2026-01-10T14:00:00Z"
    - name: CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE
      value: "S3" # just as an example
    # Rest of the backup store configuration
    - name: CAMUNDA_DATA_SECONDARY_STORAGE_TYPE
      value: "rdbms"
  # Rest of the secondary storage configuration
```

    </TabItem>

    <TabItem value="cli" label="Command line" default>

```bash

export ZEEBE_RESTORE_FROM_TIMESTAMP=2026-01-10T13:00:00Z
export ZEEBE_RESTORE_TO_TIMESTAMP=2026-01-10T14:00:00Z

mkdir -p camunda
tar -xzf camunda-zeebe-X.Y.Z.tar.gz --strip-components=1 -C camunda/
./camunda/bin/restore --from="${ZEEBE_RESTORE_FROM_TIMESTAMP}" --to="${ZEEBE_RESTORE_TO_TIMESTAMP}"
```

   </TabItem>
</Tabs>

Omitting the `from` parameter performs a point-in-time restore by applying the closest backup to the restored secondary storage backup. When the cluster is restarted in normal mode, the remaining state is re-exported to match the state closest to the provided `to` timestamp. How fine-grained restore points are depends on the scheduler's configured checkpoint interval. Learn more about configuring the checkpoint scheduler [here](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackup).

:::note
When using this approach the restored secondary storage backup must be at a prior time to the desired primary storage's restore window.
:::

### Restore success or failure

If restore was successful, the app exits with the log message `Successfully restored broker from backup`.

However, the restore will fail if:

- There is no valid backup matching the secondary storage.
- There is no valid backup within the specified range.
- The backup store is not configured correctly.
- The configured data directory is not empty.
- Due to any other unexpected errors.

If the restore fails, you can re-run the application after fixing the root cause.

### Data directory is not empty

If the data directory is not empty, the restore will fail with an error message:

```
Brokers's data directory /usr/local/zeebe/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted.
In such cases, the restore application can be configured to ignore the presence of these files and folders.
The config `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore.
By default, it ignores `lost+found` folder found on ext4 filesystems.
To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.

## Step 4: Start all Camunda 8 components

After both primary and secondary storage are restored, start the components in the following order:

1. **Start Zeebe** — Wait for all brokers to become healthy and form a cluster.
2. **Start Operate** — Requires consistent secondary storage to be available.
3. **Start Tasklist** — Requires consistent secondary storage to be available.
4. **Start Optimize** — If deployed.
5. **Start Connectors** — If deployed.

Ensure all components are configured to use the restored database instance and that the configuration matches the original deployment.

:::note
After starting the components, monitor the logs for any errors or warnings. Components will reconcile their state with the restored data, which may take some time depending on the size of the data.
:::

## (Optional) Restore Web Modeler data

If you previously backed up Web Modeler data, restore it using the same RDBMS restore tools.

See [backup and restore Web Modeler data](../modeler-backup-and-restore.md) for more details.
