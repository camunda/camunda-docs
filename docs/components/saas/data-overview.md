---
id: data-overview
title: SaaS data
sidebar_label: Data
description: "Choose where your Camunda 8 SaaS data is hosted, how long it is kept, and how to back it up."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

You can configure where your data is hosted and how it is protected and retained.

| Data option                            | Description                                                                                                                                                                                                                                                                                              |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Region](/components/saas/regions.md)  | Choose the region and type of hosting you want to use for your clusters. GCP and AWS region hosting options are available.                                                                                                                                                                               |
| [Backups](/components/saas/backups.md) | Back up the state of all Camunda 8 components (Zeebe, Operate, Tasklist, and Optimize) on a regular basis and with zero downtime. In case of failures that lead to data loss, you can restore the cluster from a backup. See [backup and restore overview](/components/saas/backup-restore-overview.md). |

## Data retention

In Camunda 8 SaaS, [data retention](/components/saas/data-retention.md) strategies are implemented. This is necessary as the amount of data can grow significantly overtime. These settings are a balance between performance and usability.

## Data locations

See [data locations](data-locations.md) to learn more about where your Camunda 8 SaaS data is located and how data is handled.
