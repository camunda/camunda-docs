---
id: backups
title: "Backups"
description: "Learn more about Backups in Camunda 8 SaaS."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

You can use the backup feature of Camunda 8 SaaS to regularly back up the state of all of its components (Zeebe, Operate, Tasklist, and Optimize) with _zero downtime_. In case of failures that lead to data loss, you can request to restore the backup.

A backup of Camunda 8 SaaS consists of a backup of Zeebe, Operate, Tasklist, Optimize, and the backup of exported Zeebe records in Elasticsearch. Since the data of these applications are dependent on each other, it is important that the backup is consistent across all components. Therefore, the backup of a Camunda 8 Cluster is taken as a whole.

With backups, you can capture snapshots of your data and applications while they are actively in use, resulting in zero downtime or disruption to your operations. Backups are designed specifically for disaster recovery purposes. Backups should not be used for archival of process data.

## Backup and cluster relationship

Backups are created and managed on a per-cluster basis. It is important to be aware that deleting a cluster will also delete all associated backups.

:::caution
Exercise caution when deleting clusters to avoid unintended loss of backups.
:::

Your cluster generation needs to be greater or equal to `8.2.4` to support backups.

## Rate limits

Each cluster has a limit of three backups. To ensure system stability backup operations are subject to rate limits. Specifically, you can perform a backup operation every 5 hours. However, it is possible to delete a backup and create a new one before the 5-hour rate limit expires.

The system retains the three most recent completed backups per cluster. Failed backup attempts do not count towards the retention count. When a new backup is successful and the retention count is reached, the oldest backup will be automatically deleted.

:::note
If you require more retained backups or more frequent backups, get in touch with your Customer Success Manager to discuss your specific needs.
:::

## Programmatic access

The backup operations can be performed programmatically using the Console API. This provides the flexibility to seamlessly integrate backup-related tasks with your existing systems and automation workflows. For detailed information on using the API, please refer to the [Console API Reference](/docs/apis-tools/console-api-reference/).

## Restore

If you need to restore your Camunda 8 cluster from a backup, please follow these steps:

1. [Contact Camunda support](https://camunda.com/services/support/) to request a restore for your backup.
2. Our support team will assist you with the restoration process and guide you through the necessary steps to recover your cluster from the backup.

For any further assistance or questions related to backups or restorations, please feel free to reach out to our support team.
