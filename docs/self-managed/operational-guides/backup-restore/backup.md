---
id: backup
title: Create a backup
sidebar_label: Create a backup
description: "Learn how to create a consistent Camunda 8 Self-Managed backup across Zeebe, Operate, Tasklist, and Optimize."
keywords: ["backup", "backups", "hot backup", "self-managed"]
---

Use this procedure to create a **consistent backup** of your Camunda 8 Self-Managed environment while components remain operational.

:::warning Consistency requirement
All components must be backed up under the **same backup ID** and **within the same backup window**.  
If backups are triggered at different times, data can become inconsistent and unrecoverable.
:::

## Before you begin

Make sure you have:

- Configured backup repositories for Zeebe, Operate, Tasklist, and Optimize.
- Verified consistent settings for:
  - Repository names
  - `indexPrefix` for Operate and Tasklist
  - Access permissions to snapshot repositories
- Confirmed that all components are healthy.

See [backup prerequisites](./index.md#prerequisites) for details.

## 1. Assign a backup ID

Use an integer greater than all previous backup IDs.  
A Unix timestamp is recommended for simplicity and uniqueness:

```bash
export BACKUP_ID=$(date +%s)
echo "Backup ID: $BACKUP_ID"
```

This ID must be used across all components to maintain consistency.

## 2. Create a Zeebe backup

Zeebe provides the **Backup Management API**, which captures a consistent snapshot of all partitions.

```bash
curl -X POST http://localhost:9600/actuator/backupRuntime \
  -H "Content-Type: application/json" \
  -d "{ \"backupId\": $BACKUP_ID }"
```

Verify that the backup is scheduled:

```bash
curl http://localhost:9600/actuator/backupRuntime/$BACKUP_ID
```

For more details, see the [Zeebe backup management API](./zeebe-backup-and-restore.md).

Zeebe backups are asynchronous. Wait for the backup state to become `COMPLETED` before proceeding.

## 3. Create web applications backups (Operate and Tasklist)

Once Zeebe is complete, create backups for Operate and Tasklist.

```bash
curl -X POST http://localhost:9600/actuator/backupHistory \
  -H "Content-Type: application/json" \
  -d "{ \"backupId\": $BACKUP_ID }"
```

To check the state:

```bash
curl http://localhost:9600/actuator/backupHistory/$BACKUP_ID
```

For detailed behavior, see the [web applications backup management API](./webapps-backup.md).

Operate and Tasklist must share the same:

- `indexPrefix`
- Repository name
- Backup ID

Otherwise, restore consistency cannot be guaranteed.

## 4. Create Optimize backup

After Operate and Tasklist backups are complete, trigger the Optimize backup.

```bash
curl -X POST http://localhost:8092/actuator/backups \
  -H "Content-Type: application/json" \
  -d "{ \"backupId\": $BACKUP_ID }"
```

Check backup state:

```bash
curl http://localhost:8092/actuator/backups/$BACKUP_ID
```

See the [Optimize backup management API](./optimize-backup.md).

## 5. Back up Web Modeler (if deployed)

Web Modeler stores its data in PostgreSQL.
Create a database dump using standard PostgreSQL utilities:

```bash
pg_dumpall -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> \
  -f dump.psql --quote-all-identifiers
```

Store the dump file securely alongside other component backups.

For more information, see [back up and restore Web Modeler data](./modeler-backup-and-restore.md).

## 6. Verify backups

Verification ensures each component backup is complete and usable.

| Component              | How to verify                                                        |
| ---------------------- | -------------------------------------------------------------------- |
| **Zeebe**              | `state` returns `COMPLETED` via `/actuator/backupRuntime/$BACKUP_ID` |
| **Operate / Tasklist** | `state` returns `COMPLETED` via `/actuator/backupHistory/$BACKUP_ID` |
| **Optimize**           | `state` returns `COMPLETE` via `/actuator/backups/$BACKUP_ID`        |
| **Web Modeler**        | PostgreSQL dump file is complete and readable                        |

You can script verification checks similar to the following:

```bash
for svc in zeebe-gateway operate tasklist optimize; do
  echo "Verifying $svc..."
  kubectl exec deploy/$svc -- curl -s http://localhost:9600/actuator/backupHistory/$BACKUP_ID | jq .state
done
```

A backup is valid only when **all components return a completed state**.
Also verify visually that Operate and Tasklist remain responsive during backup.

## 7. Store backups securely

Move completed snapshots and dumps to secure, redundant storage locations.  
Backups should be retained according to your organization’s compliance and recovery policies.

Recommended practices:

- Store backups in encrypted cloud storage such as:
  - **AWS S3** (with lifecycle policies and server-side encryption)
  - **Azure Blob Storage**
  - **Google Cloud Storage**
- Retain multiple backup generations to enable point-in-time recovery.
- Use versioned buckets or repositories to prevent accidental overwrites.
- Restrict access to backup data to authorized users only.

:::tip
Consider implementing automated replication across multiple regions or availability zones to improve recovery reliability in case of a regional outage.
:::

## 8. Optional: automate backups

You can automate backup creation using existing infrastructure and CI/CD tools.

| Tool                             | Example use case                                                            |
| -------------------------------- | --------------------------------------------------------------------------- |
| **Kubernetes CronJobs**          | Schedule recurring backup commands that trigger component APIs.             |
| **CI/CD pipelines**              | Run automated scripts to create, verify, and archive backups.               |
| **Custom orchestration scripts** | Integrate into internal operational workflows or external monitoring tools. |

Example Kubernetes CronJob snippet:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: camunda-backup
spec:
  schedule: "0 2 * * *" # Runs daily at 2AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: camunda-backup
              image: alpine/curl
              command:
                - /bin/sh
                - -c
                - |
                  BACKUP_ID=$(date +%s)
                  curl -X POST http://zeebe-gateway:9600/actuator/backupRuntime -H "Content-Type: application/json" -d "{ \"backupId\": $BACKUP_ID }"
                  curl -X POST http://operate:9600/actuator/backupHistory -H "Content-Type: application/json" -d "{ \"backupId\": $BACKUP_ID }"
          restartPolicy: OnFailure
```

You can extend automation with verification and cleanup steps, ensuring backups are both successful and rotated according to retention policies.

## Next steps

- [Restore a backup](./restore-backup.md)
- [Perform a cold backup](./cold-backup.md)
