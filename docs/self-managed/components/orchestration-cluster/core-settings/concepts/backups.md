---
id: backups
title: "Backups"
description: "Learn more about backups with the Orchestration Cluster."
---

When running an orchestration cluster with **Operate** and **Tasklist**, you must configure a snapshot repository in your chosen database:

- [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

The Orchestration Cluster is configured with the snapshot repository name to trigger database snapshots. This ensures coherent backups across all components.

:::info
Learn more about the backup procedure and why it must be triggered in the [backup guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
:::

## Configuration parameters

| Configuration key                     | Description                      | Default value |
| ------------------------------------- | -------------------------------- | ------------- |
| `camunda.data.backup.repository-name` | ES / OS snapshot repository name | -             |

:::warning Breaking change
Configuring Operate and Tasklist with different repository names will potentially create multiple backups in different repositories. Always use the same `repository-name` for both components.
:::
