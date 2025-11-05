---
id: restore
title: Restore a backup
sidebar_label: Restore a backup
description: "Learn how to restore Camunda 8 Self-Managed components from a consistent backup."
keywords: ["restore", "backup", "disaster recovery", "self-managed"]
---

Use this procedure to restore your **Camunda 8 Self-Managed** environment from a consistent backup.  
Follow the steps carefully and restore components in the required order to ensure data consistency.

:::warning
Always restore **Zeebe first**, followed by **Operate**, **Tasklist**, and **Optimize**.  
Starting dependent components before Zeebe is fully restored can result in crash loops or data inconsistencies.
:::

## Before you begin

Confirm the following:

- All components were backed up with the **same backup ID**.
- You have access to the snapshot repository for each component.
- The environment you are restoring into has **matching configuration**:
  - Repository names
  - `indexPrefix` values for Operate and Tasklist
  - Access credentials and connection settings
- You have downtime scheduled for the restoration window.

For cold backups, see [Perform a cold backup](./cold-backup.md).

## 1. Stop dependent components

Shut down all applications except the datastore and Zeebe:

| Component                      | Action                            |
| ------------------------------ | --------------------------------- |
| **Operate**                    | Stop                              |
| **Tasklist**                   | Stop                              |
| **Optimize**                   | Stop                              |
| **Web Modeler**                | Stop                              |
| **Zeebe Gateway + Brokers**    | Stop all but one gateway pod      |
| **Elasticsearch / OpenSearch** | Keep running (needed for restore) |

:::note
Leaving Elasticsearch or OpenSearch running ensures that snapshot restoration operations can be executed while other components remain offline.
:::

## 2. Restore Zeebe data

Use the **Backup Management API** or your chosen storage provider’s restore tools.

```bash
curl -X POST http://localhost:9600/actuator/backupRuntime/restore \
  -H "Content-Type: application/json" \
  -d "{ \"backupId\": <BACKUP_ID> }"
```

To check restore status:

```bash
curl http://localhost:9600/actuator/backupRuntime/$BACKUP_ID
```

When state returns `COMPLETED`, Zeebe data has been restored successfully.

For detailed guidance, see the [Zeebe backup management API](./zeebe-backup-and-restore.md).

Do **not** start Operate or Tasklist before Zeebe restoration completes. They depend on Zeebe partitions to rebuild their state.

## 3. Restore Operate and Tasklist indices

Once Zeebe is fully restored, restore snapshots for Operate and Tasklist using the Elasticsearch or OpenSearch snapshot restore API.
Use the snapshot names listed under the backup ID.

Example (Elasticsearch):

```bash
curl -X POST "http://localhost:9200/_snapshot/camunda_snapshots/camunda_webapps_<BACKUP_ID>_8.8.0_part_1_of_6/_restore" \
  -H "Content-Type: application/json" \
  -d '{ "include_global_state": false }'
```

Repeat for each snapshot part (`part_1_of_6`, `part_2_of_6`, etc.).

For details, see the [web applications backup management API](./webapps-backup.md).

After restoring snapshots, start Operate and Tasklist so they can rebuild their caches and reconnect to Zeebe.

## 4. Restore Optimize data

Optimize backups can be restored directly through the Elasticsearch/OpenSearch API, similar to the web applications.

Example (OpenSearch):

```bash
curl -X POST "http://localhost:9200/_snapshot/camunda_snapshots/camunda_optimize_<BACKUP_ID>_8.8.0_part_1_of_2/_restore" \
  -H "Content-Type: application/json" \
  -d '{ "include_global_state": false }'
```

Check the restore state in Optimize logs or with:

```bash
curl http://localhost:8092/actuator/backups/$BACKUP_ID
```

When the state returns `COMPLETE`, restart Optimize.

For reference, see the [Optimize backup management API](./optimize-backup.md).

## 5. Restore Web Modeler data (if applicable)

If Web Modeler is deployed, restore its PostgreSQL dump:

```bash
psql -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql <DATABASE_NAME>
```

After the database has been restored, restart Web Modeler.

If user IDs in your OIDC provider changed between the backup and restore, affected users may not be able to access their projects.
See [Web Modeler troubleshooting](./modeler-backup-and-restore.md#troubleshooting-missing-data).

## 6. Restart the remaining components

Restart the remaining components in order:

| Order | Component        | Reason                              |
| ----- | ---------------- | ----------------------------------- |
| 1     | Zeebe gateway(s) | Ensure full cluster synchronization |
| 2     | Operate          | Reads from Zeebe and Elasticsearch  |
| 3     | Tasklist         | Depends on Operate’s data indices   |
| 4     | Optimize         | Connects to secondary storage       |
| 5     | Web Modeler      | Independent but optional            |

Monitor logs and confirm all services start without errors.

## 7. Verify the restoration

After all components are online:

1. Check via API that each component reports a healthy status:

```bash
curl http://localhost:9600/actuator/health
```

2. **Verify Operate**
   - Open Operate and confirm that **process definitions** and **decision models** are visible.
   - Check that **historical instances** appear correctly under _Completed workflows_.
   - Ensure that workflow instance counts match your expectations from before the backup.

3. **Verify Tasklist**
   - Confirm that **active user tasks** are displayed and accessible.
   - Test that filters, claims, and completions behave normally.

4. **Verify Optimize**
   - Confirm that dashboards and reports load successfully.
   - Validate that process and decision analytics reflect restored historical data.

5. **Verify Web Modeler (if applicable)**
   - Check that projects, diagrams, and version history appear correctly.
   - Ensure all users can access their projects without permission errors.

:::tip
Combine automated verification scripts with **visual validation** in Operate and Tasklist.  
This ensures both data and UI state are correctly restored.
:::

## 8. Post-restore housekeeping

After verifying the system, perform these maintenance tasks:

- Remove temporary snapshot files from restore directories.
- Record the restore completion timestamp and backup ID.
- Update monitoring alerts to reflect new indices and partitions.
- Run a new [create a backup](./create-backup.md) once the system stabilizes.

## Next steps

- [Create a backup](./create-backup.md)
- [Perform a cold backup](./cold-backup.md)
