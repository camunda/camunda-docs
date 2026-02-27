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

Because these systems maintain complementary portions of the data, **both must be restored to the same backup point** to ensure consistency.

:::note
When restoring Camunda 8 from a backup, all components must be restored from their backup that corresponds to the same backup ID.
:::

## Prerequisites

The following prerequisites are required before you can restore a backup:

| Prerequisite       | Description                                                                                                                         |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Clean state/data   | The RDBMS instance is set up and running with a clean state (empty database or dedicated restore target).                           |
| Backup available   | You have a valid RDBMS backup and a corresponding Zeebe backup created with the same backup ID. See [Create a backup](./backup.md). |
| Backup storage     | Zeebe is configured with the same backup storage as outlined in the [prerequisites](./backup.md#prerequisites).                     |
| Components stopped | All Camunda components (Zeebe, Operate, Tasklist, Optimize, Connectors) must be stopped before starting the restore process.        |

:::warning
It is critical that no Camunda components are running during the restore. Running components may propagate an incorrect cluster configuration, potentially disrupting cluster communication and data consistency.
:::

## Restore process

### Example API endpoint definition

This will heavily depend on your setup. The following examples are based on examples given in the [Management API](../backup-and-restore.md#management-api) in Kubernetes using either active port-forwarding or overwrite of the local curl command.

```bash
# Set the backup ID to restore from.
export BACKUP_ID=<your-backup-id>

# For Kubernetes port-forwarding, set the following endpoints:
export ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600
```

### Step 1: Stop all Camunda components

Before restoring, ensure all Camunda 8 components are stopped. No component should be running during the restore process to avoid data inconsistencies.

### Step 2: Restore the RDBMS backup

Restore the database backup into an empty or clean database instance using your RDBMS-specific tooling.

<Tabs groupId="rdbms-restore">
   <TabItem value="postgresql" label="PostgreSQL" default>

```bash
pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME -c "camunda_backup_$BACKUP_ID.dump"
```

Alternatively, if you used a plain SQL dump:

```bash
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f "camunda_backup_$BACKUP_ID.sql"
```

   </TabItem>
   <TabItem value="mariadb" label="MariaDB / MySQL">

```bash
mysql -h $DB_HOST -u $DB_USER -p $DB_NAME < "camunda_backup_$BACKUP_ID.sql"
```

   </TabItem>
   <TabItem value="oracle" label="Oracle">

Use Oracle RMAN or Data Pump (`impdp`) to restore the backup according to your organization's procedures.

```bash
impdp $DB_USER/$DB_PASSWORD@$DB_HOST/$DB_SERVICE directory=BACKUP_DIR dumpfile="camunda_backup_$BACKUP_ID.dmp" logfile="camunda_restore_$BACKUP_ID.log"
```

   </TabItem>
   <TabItem value="mssql" label="SQL Server">

```sql
RESTORE DATABASE [camunda]
FROM DISK = N'/var/opt/mssql/backup/camunda_backup_<BACKUP_ID>.bak'
WITH REPLACE;
```

   </TabItem>
</Tabs>

:::note
Verify the RDBMS restore completed successfully before proceeding. Use your database system's validation tools to confirm data integrity.
:::

### Step 3: Restore Zeebe from its backup

Restore Zeebe using the same backup ID as the RDBMS restore. The Zeebe restore process replays data from the backup into each broker's partition.

See [Restore Zeebe](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md) for the full API reference and detailed instructions.

:::warning
Persistent volumes or disks must not contain any pre-existing data before restoring Zeebe. If data exists from a previous deployment, it must be cleared first.
:::

### Step 4: Start all Camunda 8 components

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
