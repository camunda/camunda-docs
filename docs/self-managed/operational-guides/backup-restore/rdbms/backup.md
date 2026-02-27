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
  ]
description: "Learn how to back up your Camunda 8 Self-Managed components using a relational database."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Back up your Camunda 8 Self-Managed components and cluster when using a relational database management system (RDBMS) as secondary storage.

## Prerequisites

The following prerequisites are required before you can create a backup.

| Prerequisite                    | Description                                                                                                                                                                                                                                 |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Configure Zeebe backup storage. | Configure the backup storage for Zeebe. This is required regardless of your secondary storage choice. See [Zeebe backup configuration](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackup). |

:::note
You should keep the backup storage of the components configured at all times to ease the backup and restore process and avoid unnecessary restarts.
:::

## Considerations

When Camunda uses an RDBMS as **secondary storage**, backups and restores involve **two independent systems**:

- **Zeebe (primary storage)**
- **The external RDBMS used for secondary storage**

Because these systems maintain complementary portions of the data, **their backups must be coordinated**. A consistent restore requires restoring _both_ to the same backup point.

A backup consists of a Zeebe broker partition backup paired with a database dump taken while Zeebe exporting is paused. This coordination ensures data consistency between Zeebe and the RDBMS.

## About the backup process

When Camunda uses an RDBMS as **secondary storage**, backups and restores involve **two independent systems**:

- **Zeebe (primary storage)**
- **The external RDBMS used for secondary storage**

:::caution before you begin

- To create a consistent backup, you **must** complete the steps in the outlined order.
- You must complete the [prerequisites](#prerequisites) before creating a backup.

:::

## Back up process

### Example API endpoint definition

This will heavily depend on your setup, the following examples are based on examples given in the [Management API](../backup-and-restore.md#management-api) in Kubernetes using either active port-forwarding or overwrite of the local curl command.

As noted in the [Management API](../backup-and-restore.md#management-api) section, this API is typically not publicly exposed. Therefore, you will need to access it directly using any means available within your environment.

```bash
# Define the backup ID, we recommend using unix timestamps.
export BACKUP_ID=$(date +%s)

# For Kubernetes port-forwarding, set the following endpoints:
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600
```

### 1. Soft pause exporting in Zeebe

Pausing ensures Zeebe stops writing new records to secondary storage while the RDBMS backup is taken.

See the [Zeebe management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md) for details.

```bash
curl -X POST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/exporting/pause" -H "Content-Type: application/json" -d '{"desiredStatus": "SOFT_PAUSED"}'
```

This will continue exporting records, but not delete those records (log compaction) from Zeebe. This makes the backup a hot backup — Zeebe continues processing while the backup is taken, ensuring high availability.

### 2. Back up the relational database

Use your database system's native tools to create a backup.

:::note
Ensure the RDBMS backup completes successfully before proceeding to the next step. Verify the backup using your database system's validation tools.
:::

### 3. Take a Zeebe backup

Create a Zeebe backup using the Backup Management API. Use the same `BACKUP_ID` as in the previous step.

See [Take a Zeebe backup](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md) for the full API reference.

```bash
curl -X POST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime" \
  -H "Content-Type: application/json" \
  -d "{\"backupId\": $BACKUP_ID}"
```

### 4. Wait for Zeebe backup completion

Confirm Zeebe has finished creating the backup before resuming.

See [Monitor a backup](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md) for the full API reference.

```bash
curl "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupRuntime/$BACKUP_ID"
```

Wait until the backup state is `COMPLETED`:

```json
{
  "backupId": 1748937221,
  "state": "COMPLETED"
}
```

### 5. Resume exporting in Zeebe

Once both the RDBMS and Zeebe backups are complete, resume exporting.

See the [Zeebe management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md) for details.

```bash
curl -X POST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/exporting/pause" -H "Content-Type: application/json" -d '{"desiredStatus": "ENABLED"}'
```

:::note
We recommend using a **unix timestamp** as the shared backup ID to simplify correlation between Zeebe and RDBMS backups.
:::

## Scheduled backups

With Zeebe being set up against an RDBMS secondary storage, you have the option to enable Zeebe's internal backup scheduler. Enabling the scheduler will result in primary storage backups being
created at the predefined interval. Learn more about configuring the backup scheduler [here](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackup).

In addition to the scheduler, it's also suggested to enable continuous primary storage backups, by setting `camunda.data.primary-storage.backup.continous` to true. With continuous backups enabled, log stream's compaction is bound by the latest backed up position. In turns, this means that
no part of Zeebe's state can be deleted without being backed up first.

These two options provide a strong guarantee regarding the resiliency of your data and provide you the ability to always maintain an active window that you can restore to as a disaster recovery scenario.

:::tip
You can still request on-demand primary storage backups through the regular [API](../../zeebe-backup-and-restore/#request), without the `backupId` parameter as it's being generated by the cluster.
:::

:::warning
To properly configure your backup interval consult the metrics provided regarding your average _take backup latency_. As a general rule of thumb, the backup interval must be greater than your latency. Latency is affected by
the size of Zeebe's runtime state.
:::

## (Optional) Back up Web Modeler data {#back-up-web-modeler-data}

If you are using Web Modeler, you can also back up its data. Web Modeler stores its data in a relational database, so you can use the same backup tools as for the RDBMS secondary storage.

See [backup and restore Web Modeler data](../modeler-backup-and-restore.md) for more details.

## Primary storage retention

With Camunda 8.9 you now have the option to enable a retention mechanism over primary storage (Zeebe's) backups. This will periodically delete backups from the configured blob storage based on the preconfigured retention window. Learn more about configuring backup retention [here](../../../../components/orchestration-cluster/core-settings/configuration/properties/#camundadataprimary-storagebackupretention). The retention mechanism will always maintain one backup regardless of the window configuration, this is a data resiliency measure.

:::note
This only affects the primary storage.
:::
