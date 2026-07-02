---
id: backups
title: "Backups"
description: "Learn more about Backups in Camunda 8 SaaS."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

You can use the backup feature of Camunda 8 SaaS to regularly back up the state of all of its components (Zeebe, Operate, Tasklist, and Optimize) with _zero downtime_. In case of failures that lead to data loss, you can restore a cluster from a backup.

A Camunda 8 SaaS backup consists of a data backup of Zeebe, Operate, Tasklist, Optimize, and the backup of exported Zeebe records in Elasticsearch. Since the data of these applications depend on each other, the backup must be consistent across all components. Therefore, the backup of a Camunda 8 cluster is taken as a whole.

With backups, you can capture snapshots of your data and applications while they are actively in use, resulting in zero downtime or disruption to your operations. Backups are designed specifically for disaster recovery purposes, and should not be used for archival of process data.

:::caution
Backups are created and managed on a per-cluster basis. It is important to be aware that deleting a cluster will also delete all associated backups.

Exercise caution when deleting clusters to avoid unintended loss of backups.
:::

> Your cluster generation needs to be greater or equal to `8.2.4` to support backups.

## Backup location

When you create a cluster in Camunda 8 SaaS, you must specify a region for that cluster.

You also need to specify where the backups for that cluster will be located:

- By default, the backups will be located in the same region as the cluster.
- For disaster recovery reasons, you can select a "dual-region" backup location. Backups will be automatically replicated in the secondary region to give you better protection in case the primary region experiences disruption. Dual-region backup is offered at no additional cost.

## Manual backup

Manual backups refer to the user-initiated process of creating a consistent snapshot of the state of all system components, including Zeebe, Operate, Tasklist, and Optimize. These backups are managed on a per-cluster basis and are primarily designed for disaster recovery purposes.

### Retention and rate limits

To ensure system stability, backup operations are subject to rate limits. Specifically, you can perform a backup operation every 15 minutes.
However, users can delete an existing backup to create a new one before the rate limit period ends.

The system retains the five most recent completed backups per cluster category. Failed backup attempts do not count toward the retention count. When a new backup is successful and the retention count is reached, the oldest backup is automatically deleted.

## Scheduled backups

Scheduled backups are created periodically (e.g daily, weekly). They are configured to run automatically on the scheduled time.

### Retention

A backup schedule retains the last five successful and failed backups. Failed backups are retained to allow further root-cause analysis for backup failures. If a backup fails, it is not retried immediately as the failure can lead to instability.

:::note
If you require more retained backups or more frequent backups, [contact Camunda support](https://camunda.com/services/support/) to discuss your specific needs.
:::

## Programmatic access

The backup operations can be performed programmatically using the Administration API.
This provides the flexibility to seamlessly integrate backup-related tasks with your existing systems and automation workflows.
For detailed information on using the API, refer to the [Administration API reference](/apis-tools/administration-api/administration-api-reference.md).

## Restore

You can restore your cluster from a selected backup directly in Console or through the Administration API.

- See [backup and restore overview](./backup-restore-overview.md).
- See [restore a cluster from backup](./how-to-restore.md).
- See [restore troubleshooting](./restore-troubleshooting.md).

If the restore action is not available in your organization yet, [contact Camunda support](https://camunda.com/services/support/).
