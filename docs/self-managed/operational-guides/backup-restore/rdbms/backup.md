---
id: rdbms-backup
sidebar_label: Create a backup
title: Camunda backup creation (RDBMS)
keywords:
  [
    "backup",
    "backups",
    "rdbms",
    "postgresql",
    "mariadb",
    "oracle",
    "sql server",
    "mysql",
    "continuous backup",
    "backup range",
    "backup state",
  ]
description: "Learn how to back up your Camunda 8 Self-Managed components when a relational database is used for secondary storage, including continuous backups, backup ranges, and monitoring backup state."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Back up your Camunda 8 Self-Managed Orchestration cluster components (Zeebe, Operate, and Tasklist) when using a relational database management system (RDBMS) as secondary storage.

:::note
This procedure is part of the **first phase of Decoupled Continuous Backups** and covers only **Zeebe**, **Operate**, and **Tasklist**. It does **not** cover **Identity** or **Optimize**.

Optimize always stores its data in Elasticsearch or OpenSearch, independently of the Orchestration Cluster's secondary storage. If you deploy Optimize alongside an RDBMS-backed Orchestration Cluster, back up Optimize independently using the [standalone Optimize backup procedure](../optimize-backup-and-restore.md). You do not need to switch the Orchestration Cluster backup to the Elasticsearch / OpenSearch path.
:::

## Prerequisites

The following prerequisites are required before you can create a backup.

| Prerequisite                                    | Description                                                                                                                                                                                                                                                                         |
| :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configure Zeebe backup storage.                 | Configure the backup storage for Zeebe. This is required regardless of your secondary storage choice. See [Zeebe backup configuration](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackup).                                         |
| Enable continuous backups                       | Enable continuous backups. See [Zeebe scheduler configuration](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackup).                                                                                              |
| (Recommended) Configure Zeebe scheduled backup. | Configure Zeebe's internal primary storage backup scheduler. See [Zeebe scheduler configuration](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackup).                                                            |
| Set up RDBMS backups.                           | You are responsible for backing up the RDBMS using your database vendor's native tools (for example, `pg_dump`, `mysqldump`, `RMAN`). Back up the **entire Camunda database**, including all component tables. Schedule RDBMS backups at a similar frequency to your Zeebe backups. |

## Architecture overview

When Camunda uses an RDBMS as **secondary storage**, backups involve **two independent systems**:

- **Zeebe (primary storage)**: Backs up its internal state (log stream, snapshots) to an external blob store (S3, GCS, Azure, or filesystem). These are called **primary storage backups**.
- **The external RDBMS**: Backed up using your database vendor's native tools (pg_dump, mysqldump, RMAN, etc.). This is the **secondary storage backup**.

During restore, Zeebe uses the exporter position stored in the RDBMS to find the correct primary storage backup, or backups, that match the RDBMS state. This ensures consistency between the two systems without requiring synchronized backup timing.

:::tip
While Zeebe during restore will match the secondary storage's backup position, it is recommended to have the backups taken at similar intervals. This minimizes the time required after restore for Zeebe to re-export events to the secondary storage.
:::

## Continuous backups

Continuous backups must be enabled for RDBMS backup and restore.

### How continuous backups work

Continuous backups rely on a Zeebe feature that retains data records in the log stream until they are backed up.
This ensures that after restore, the state of primary and secondary storage is in sync, without the need to orchestrate primary and secondary storage backups.

When continuous backups are enabled:

1. Zeebe prevents log compaction from deleting any segment that hasn't been backed up yet, and tracks backup metadata so you can query available backup ranges.
2. The system tracks **backup ranges** — unbroken sequences of consecutive backups. These ranges define the time windows available for restore and can be queried via the [backup state actuator](../zeebe-backup-and-restore.md#request-runtime-state).

:::warning
Without [scheduled backups](#scheduled-backup) or regular manual backups, continuous mode causes disk usage to grow indefinitely because Zeebe cannot compact any log segments. Always pair continuous backups with a backup schedule.
:::

### Enable continuous backups

Set the following configuration property:

<Tabs>
  <TabItem value="yaml" label="Application properties" default>

```yaml
camunda:
  data:
    primary-storage:
      backup:
        store: S3 # or GCS, AZURE, FILESYSTEM
        continuous: true
```

  </TabItem>
  <TabItem value="env" label="Environment variables">

```bash
export CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_STORE=S3
export CAMUNDA_DATA_PRIMARY_STORAGE_BACKUP_CONTINUOUS=true
```

  </TabItem>
</Tabs>

### Checkpoint interval

The checkpoint interval controls how frequently Zeebe injects marker checkpoints into the log stream. These markers serve as potential restore points — since a cluster can only be restored to a checkpoint that exists on all partitions, more frequent markers enable finer-grained [point-in-time restore](./restore.md#point-in-time-restore).

```yaml
camunda:
  data:
    primary-storage:
      backup:
        checkpoint-interval: PT15M # inject a marker checkpoint every 15 minutes
```

Note that the checkpoint interval does **not** determine how frequently backups are taken — that is controlled by the [backup schedule](#scheduled-backup). A shorter checkpoint interval provides more precise restore points within the backed-up range, at the cost of slightly more metadata overhead.

## Backup ranges

A **backup range** is a contiguous sequence of backups that together cover the complete log data between the first and last backup, with no gaps. Ranges are tracked per partition.

Ranges are critical for restore because restoring from a time window or to match the RDBMS state requires complete log coverage. Each successful backup extends the current range as long as its log data connects to the previous backup. If a backup fails and the next successful backup no longer covers the missing log data, the current range ends and a new range begins.

Use the [backup state actuator](../zeebe-backup-and-restore.md#request-runtime-state) to inspect the current ranges for each partition.

## Backup process

### Scheduled backup

Zeebe's internal backup scheduler creates primary storage backups at a predefined interval. The **schedule** and **continuous mode** serve complementary purposes: the schedule triggers the backups, while continuous mode prevents log compaction and enables backup range trackin, this ensures you always have backup ranges available for disaster recoveryg.
Both should be enabled together for a complete backup strategy. Learn more about configuring the backup scheduler [here](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackup).

#### Recommended configuration

```yaml
camunda:
  data:
    primary-storage:
      backup:
        store: S3 # or GCS, AZURE, FILESYSTEM
        continuous: true
        schedule: PT1H # take a backup every hour
        checkpoint-interval: PT15M # restore point granularity
        retention:
          window: P7D # retain backups for 7 days
          cleanup-schedule: PT1H # check for expired backups every hour
```

:::warning
To properly configure your backup interval, monitor the `zeebe.backup.operations.latency` metric (with `operation=take`) to understand your average backup duration. As a general rule of thumb, the backup interval must be greater than your latency. Latency is affected by the size of Zeebe's runtime state.
:::

:::tip
You can still request on-demand primary storage backups through the regular [API](../../zeebe-backup-and-restore/#request), without the `backupId` parameter as it's being generated by the cluster.
:::

### Manual backup

If you opt out of the scheduled backup approach, you can still request on-demand backups using the [backup management API](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md). The `backupId` is generated automatically by the cluster.

```bash
# For Kubernetes port-forwarding, set the following endpoints:
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600

curl -X POST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime" \
  -H "Content-Type: application/json"
```

:::tip
It is recommended to have the primary storage backup taken after the secondary storage one, if you are coordinating the backup process.
:::

## Verify your backup setup

After configuring backups, verify that they are working correctly by querying the [backup state actuator](../zeebe-backup-and-restore.md#request-runtime-state):

```bash
curl 'http://localhost:9600/actuator/backupRuntime/state'
```

Confirm the following in the response:

- **`backupStates`** contains an entry for each partition, indicating that at least one backup has been taken.
- **`ranges`** contains at least one range per partition. Each range has a `start` and `end` timestamp defining the time period you can restore from.
- If you see **multiple ranges** for a single partition, there is a gap between them where no data is available for restore.

If the response is empty or missing partitions, check your backup store configuration and ensure continuous backups are enabled.

## Backing up RDBMS

Back up the RDBMS as described in the [prerequisites](#prerequisites). While exact synchronization with Zeebe backups is not required, as the restore process handles alignment automatically, keeping backup intervals similar minimizes the time Zeebe needs to re-export events after a restore.

During restore, Zeebe reads the **exporter position** from the `EXPORTER_POSITION` table — which records the last Zeebe log stream position exported to the RDBMS — to determine which primary storage backup to restore from.

## (Optional) Back up Optimize data {#back-up-optimize-data}

If you are using Optimize alongside an RDBMS-backed Orchestration Cluster, Optimize must be backed up independently. Optimize always stores its data in Elasticsearch or OpenSearch, regardless of what the Orchestration Cluster uses as secondary storage.

See [back up and restore Optimize independently](../optimize-backup-and-restore.md) for the complete procedure.

## (Optional) Back up Web Modeler data {#back-up-web-modeler-data}

If you are using Web Modeler, you can also back up its data. Web Modeler stores its data in a relational database, so you can use the same backup tools as for the RDBMS secondary storage.

See [backup and restore Web Modeler data](../modeler-backup-and-restore.md) for more details.

## Primary storage retention

Automatic retention for primary storage (Zeebe's) backups is available. This periodically deletes backups from the configured blob storage based on a preconfigured retention window. At least one backup is always retained to prevent potential data loss, even if it falls outside the configured retention window.. To configure backup retention settings, see [backup retention configuration](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackupretention).

When retention deletes old backups, the affected [backup ranges](#backup-ranges) shrink accordingly, narrowing your available restore window. Ensure that your retention window is at least as long as the restore window you require. For example, if you need the ability to restore to any point in the last 7 days, set the retention window to at least `P7D`.

:::note
Backups created outside or before the scheduler was activated are also susceptible to being deleted by the retention mechanism. This only affects the primary storage.
:::
