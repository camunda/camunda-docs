---
id: backups
title: "Backups"
description: "Learn more about Backups in Camunda Platform 8 SaaS."
---

You can use the backup feature of Camunda Platform 8 SaaS to regularly back up the state of all of its components (Zeebe, Operate, Tasklist, and Optimize) with _zero downtime_. In case of failures that lead to data loss, you can request to restore the backup.

A backup of Camunda Platform 8 SaaS consists of a backup of Zeebe, Operate, Tasklist, Optimize, and the backup of exported Zeebe records in Elasticsearch. Since the data of these applications are dependent on each other, it is important that the backup is consistent across all components. Therefore, the backup of a Camunda Platform 8 cluster is taken as a whole.

:::caution
Backups are created and managed on a per-cluster basis.
**Deleting a Cluster also deletes your backups!**
:::

## Rate Limits

The backup feature is an [<span class="badge badge--enterprise-only">Enterprise only</span>] feature. Each cluster is limited to three backups. To ensure system stability backup operations are subject to rate limits. The rate limit allows to perform a backup operation every 5 hours. However, it is possible to delete a backup and create a new one before the 5-hour rate limit expires.

The system retains the three most recent completed backups per cluster. In case of backup failure, the backup does not count towards the retention count.
:::caution
The oldest backup will be deleted when the backup succeeds and the retained backup is reached.
:::

:::note
Need more retained backups or do them more frequent? Get in touch with your Customer Success Manager.
:::

## Programmatic access

The backup operations can be performed programmatically using the Console API. This allows seamless integration with existing systems and provides the flexibility to automate backup-related tasks. For detailed information on using the API, please refer to the [TODO https://docs.camunda.io/docs/8.1/apis-tools/console-api-reference/].

## Restore

To restore your Camunda 8 SaaS Cluster from a backup, please contact our support.

- Contact [Camunda support](https://camunda.com/services/support/) to request a restore for your backup.
