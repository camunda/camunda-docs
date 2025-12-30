---
id: backups
title: "Backups"
description: "Learn more about backups with the Orchestration Cluster."
---

When running an orchestration cluster with [secondary storage](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage), you must configure a snapshot repository in your chosen database:

- [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

The Orchestration Cluster is configured with the snapshot repository name to trigger database snapshots. This ensures coherent backups.

:::info
Learn more about the backup procedure and why it must be triggered in the [backup guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
:::

## Configure this in Kubernetes with Helm

When you deploy Camunda 8 Self-Managed on Kubernetes, set the backup repository name as an application configuration value.

See [application configurations](/self-managed/deployment/helm/configure/application-configs) for how to provide configuration keys using Helm (for example, via values files or environment variable mappings).

## Configuration parameters

| Configuration key                     | Description                      | Default value |
| ------------------------------------- | -------------------------------- | ------------- |
| `camunda.data.backup.repository-name` | ES / OS snapshot repository name | -             |
