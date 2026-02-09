---
id: importer
title: "Importer"
description: "Learn when and how to use the Importer module to migrate Zeebe data in the Orchestration Cluster."
---

The Importer module is part of the Orchestration Cluster. For new 8.8+ installations, it is not required. It is only used when migrating Zeebe data from Camunda 8.7 or earlier.

:::note
The Importer runs temporarily during a migration. It is not a continuously running module and does not need to be configured for normal cluster operation.
:::

## When to use the Importer

- **Migration from Camunda 8.7 or earlier**:  
  Enable the Importer to migrate existing Zeebe workflow data into the 8.8 Orchestration Cluster.
- **New 8.8 installations**:  
  Do not configure or enable the Importer.

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
- `nodeCount` and `currentNodeId` are required when running multiple Importer nodes.
- `threadsCount` controls how many concurrent threads process Zeebe partitions.

After the migration completes, disable the Importer or remove the configuration. The Importer is not required after migration.

## Scaling the Importer during migration

If you need faster migration, you can run multiple Importer nodes or increase threads.

Consider the following when scaling:

- Each Importer node processes specific Zeebe partitions.
- The total number of threads across all Importer nodes should not exceed the number of Zeebe partitions.
- Excess threads will remain idle and provide no performance benefit.
