---
id: cold-backup
title: Perform a cold backup
sidebar_label: Perform a cold backup
description: "Learn how to perform a cold backup of Camunda 8 Self-Managed when downtime is acceptable."
keywords: ["backup", "cold backup", "downtime", "self-managed"]
---

Perform a cold backup when you can tolerate downtime and want to capture a **complete snapshot of all Camunda 8 data**, including runtime state, without using the management APIs.

Cold backups are often used before major upgrades, schema migrations, or infrastructure changes.

:::note
Unlike hot backups, cold backups require stopping all Camunda 8 components to ensure full consistency across Zeebe and secondary storage.
:::

## When to use a cold backup

Use a cold backup if:

- You are preparing for a version upgrade or infrastructure migration.
- You want an offline snapshot of all persistent volumes and databases.
- You need a guaranteed consistent restore point without using the Backup Management APIs.
- You are operating in an environment where **management APIs are not exposed** or not configured.

For hot (online) backups, see [create a backup](./backup.md).

## Before you begin

Ensure that you have:

- Administrator access to the cluster or environment.
- Access to the underlying storage (for example, persistent volumes in Kubernetes or disk paths in manual deployments).
- A defined storage location for your backup files.
- A maintenance window to perform the operation.

:::warning
Cold backups capture raw state data.  
Restoring from a cold backup requires restoring the same volume paths or database files to a cluster configured identically to the original.
:::

## Cold backup procedure

### 1. Stop all Camunda 8 components

Shut down all services in the following order:

| Order | Component                  | Action                                                                 |
| ----- | -------------------------- | ---------------------------------------------------------------------- |
| 1     | Web Modeler                | Stop                                                                   |
| 2     | Optimize                   | Stop                                                                   |
| 3     | Operate                    | Stop                                                                   |
| 4     | Tasklist                   | Stop                                                                   |
| 5     | Zeebe brokers and gateways | Stop all pods or services                                              |
| 6     | Connectors and Identity    | Stop                                                                   |
| 7     | Elasticsearch/OpenSearch   | Keep running only if taking a snapshot through its API; otherwise stop |

#### Helm-based environments

If you deployed Camunda 8 using Helm:

```bash
helm uninstall camunda
```

Alternatively, to stop pods without uninstalling:

```bash
kubectl scale statefulset camunda-zeebe --replicas=0
kubectl scale deployment camunda-operate --replicas=0
kubectl scale deployment camunda-tasklist --replicas=0
kubectl scale deployment camunda-optimize --replicas=0
kubectl scale deployment camunda-connectors --replicas=0
kubectl scale deployment camunda-identity --replicas=0
kubectl scale deployment camunda-web-modeler --replicas=0
```

#### Manual deployments

If running components manually, stop each process cleanly using `Ctrl+C` or the service manager, then verify all processes have exited.

```bash
ps aux | grep camunda
```

### 2. Back up persistent volumes and databases

Perform a snapshot or copy of each data directory or persistent volume.

| Component                         | Backup target                   | Example                                           |
| --------------------------------- | ------------------------------- | ------------------------------------------------- |
| **Zeebe**                         | `/usr/local/zeebe/data`         | Copy data directory or take a filesystem snapshot |
| **Elasticsearch/OpenSearch**      | `/usr/share/elasticsearch/data` | Use native snapshot APIs or disk-level snapshot   |
| **Operate / Tasklist / Optimize** | Persistent volumes              | Snapshot volumes or copy directory contents       |
| **Web Modeler**                   | PostgreSQL database             | Use `pg_dump` or database snapshot tools          |

Example for file-based backup:

```bash
tar -czvf camunda-cold-backup-$(date +%Y%m%d).tar.gz /var/lib/camunda
```

Example for PostgreSQL:

```bash
pg_dumpall -U <DATABASE_USER> -h <DATABASE_HOST> -p <DATABASE_PORT> -f dump.psql --quote-all-identifiers
```

### 3. Verify backup integrity

- Confirm that all backup files exist and are non-empty.
- Validate that archive or snapshot commands completed successfully.
- Store the resulting backup in a secure, versioned storage location (for example, S3, GCS, or Azure Blob).

### 4. Restart all components

Start the components again in reverse order:

| Order | Component                  | Action                  |
| ----- | -------------------------- | ----------------------- |
| 1     | Elasticsearch/OpenSearch   | Start or verify running |
| 2     | Zeebe brokers and gateways | Start                   |
| 3     | Operate                    | Start                   |
| 4     | Tasklist                   | Start                   |
| 5     | Optimize                   | Start                   |
| 6     | Connectors and Identity    | Start                   |
| 7     | Web Modeler                | Start                   |

#### Helm-based environments

If scaled to zero earlier:

```bash
kubectl scale statefulset camunda-zeebe --replicas=3
kubectl scale deployment camunda-operate --replicas=1
kubectl scale deployment camunda-tasklist --replicas=1
kubectl scale deployment camunda-optimize --replicas=1
kubectl scale deployment camunda-connectors --replicas=1
kubectl scale deployment camunda-identity --replicas=1
kubectl scale deployment camunda-web-modeler --replicas=1
```

Confirm all pods are running:

```bash
kubectl get pods
```

#### Manual deployments

Restart processes or services as appropriate to your environment.

### 5. Verify the restored state

- Check Zeebe logs for successful startup and partition health.
- Confirm Operate and Tasklist can connect to Zeebe.
- Verify that process definitions, instances, and user tasks are visible.
- If Web Modeler is used, open it and confirm access to projects.

## Best practices

- Store cold backups separately from hot backups to maintain redundancy.
- Label cold backups with version, date, and environment details.
- Perform periodic test restores to validate the reliability of backup archives.
- Automate snapshotting at the infrastructure level (for example, with EBS, Azure Managed Disks, or GCS Persistent Disks).

## Next steps

- [Create a backup](./backup.md)
- [Restore a backup](./restore.md)
