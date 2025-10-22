---
id: importer
title: "Importer"
description: "Learn when and how to use the Importer module for migrating Zeebe data in the Orchestration Cluster."
---

The **Importer** module is part of the Orchestration Cluster, but for **new 8.8+ installations you do not need to use it**. It is only relevant when migrating data from **Camunda 8.7 or earlier**.

:::note
The Importer runs **temporarily during a migration**. It is not a continuously running module and does not need to be configured for normal cluster operation.
:::

## When to use the Importer

- **Migration from 8.7+**: Use the Importer to bring existing Zeebe workflow data into your 8.8 Orchestration Cluster.
- **New 8.8 installations**: Ignore the Importer entirely; no configuration is needed.

## Basic configuration for migration

To run the Importer temporarily:

```yaml
camunda.*:
  webappEnabled: true
  importerEnabled: true
  clusterNode:
    nodeCount: 1
    currentNodeId: 0
  importer:
    threadsCount: 3
```

- `importerEnabled: true` runs the module for migration.
- `nodeCount` and `currentNodeId` are used if you have multiple Importer nodes.
- `threadsCount` controls how many concurrent threads process Zeebe partitions.

:::note
Once the migration finishes, **disable the Importer** or remove the configuration. Continuous running is not needed for normal cluster operation.
:::

## Scaling

If you need faster migration, you can run multiple Importer nodes or increase threads. Keep in mind:

- Each node handles specific Zeebe partitions.
- `(nodes) * (threadsCount)` should not exceed total Zeebe partitions to avoid idle threads.

## Summary

- **New 8.8+ clusters**: Ignore the Importer.
- **Migration scenarios**: Enable temporarily until migration completes.
- Configuration is only needed for the duration of migration.
- No ongoing maintenance is required after migration.
