---
id: backups
title: "Backups"
description: "Learn more about Backups in Camunda 8 SaaS."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

You can use the backup feature of Camunda 8 SaaS to regularly back up the state of all of its components (Zeebe, Operate, Tasklist, and Optimize) with _zero downtime_. In case of failures that lead to data loss, you can request to restore the backup.

A Camunda 8 SaaS backup consists of a data backup of Zeebe, Operate, Tasklist, Optimize, and the backup of exported Zeebe records in Elasticsearch. Since the data of these applications depend on each other, the backup must be consistent across all components. Therefore, the backup of a Camunda 8 cluster is taken as a whole.

With backups, you can capture snapshots of your data and applications while they are actively in use, resulting in zero downtime or disruption to your operations. Backups are designed specifically for disaster recovery purposes, and should not be used for archival of process data.

:::caution
Backups are created and managed on a per-cluster basis. It is important to be aware that deleting a cluster will also delete all associated backups.

Exercise caution when deleting clusters to avoid unintended loss of backups.
:::

> Your cluster generation needs to be greater or equal to `8.2.4` to support backups.

## Backup Types

### Manual backup

Manual backups refer to the user-initiated process of creating a consistent snapshot of the state of all system components, including Zeebe, Operate, Tasklist, and Optimize. These backups are managed on a per-cluster basis and are primarily designed for disaster recovery purposes.

#### Backup Limits and Rate Limits

Each cluster has a limit of three (3) manual backups. To ensure system stability, backup operations are subject to rate limits. Specifically, you can perform a backup operation every five hours.
However, users can delete an existing backup to create a new one before the rate limit period ends.

The system retains the three most recent completed backups per cluster. Failed backup attempts do not count towards the retention count. When a new backup is successful and the retention count is reached, the oldest backup is automatically deleted.

### Scheduled backups

Scheduled backups are created periodically (e.g daily, weekly..). They are configured to run automatically on the scheduled time.

#### Backup Limits and Rate Limits

A backup schedule retains the last three successful and failed backups. Failed backups are retained to allow further root-causing why the backup failed.

The system retains the three (3) most recent successful/failed backups per cluster.
If a backup fails, it's not retried immediately as the system waits for the next backup attempt.

### Note

> If you require more retained backups or more frequent backups, contact your Customer Success Manager to discuss your specific needs.

## Programmatic access

The backup operations can be performed programmatically using the Console API. This provides the flexibility to seamlessly integrate backup-related tasks with your existing systems and automation workflows. For detailed information on using the API, refer to the [Console API reference](docs/apis-tools/console-api-reference.md).


## Restore

To restore your Camunda 8 cluster from a backup (and for any further assistance in general), [contact Camunda support](https://camunda.com/services/support/) to request a restore for your backup. Our support team will assist you with the restoration process and guide you through the necessary steps to recover your cluster from the backup.
