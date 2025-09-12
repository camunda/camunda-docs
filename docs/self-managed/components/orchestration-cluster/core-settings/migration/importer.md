---
id: importer
title: "Importer"
description: "Learn how the Importer module works for importing Zeebe data in the Orchestration Cluster."
---

The Orchestration Cluster consists of multiple modules that work together with Zeebe and Identity. One of these modules is the **Importer**, responsible for importing data from Zeebe.

:::note
The Importer in the Orchestration Cluster is only run temporarily during migration scenarios and is not a continuously running process.
:::

## Modules

A typical Orchestration Cluster instance consists of:

- **Web app**: Contains the UI and operation executor functionality.
- **Importer**: Imports data from Zeebe.

## Configuration

Modules can be run together or separately in any combination and can be scaled. By default, all modules are enabled; to disable a module, configure the following parameters:

| Configuration parameter | Description                                | Default value |
| ----------------------- | ------------------------------------------ | ------------- |
| `*.importerEnabled`     | When true, the Importer module is enabled. | false         |
| `*.webappEnabled`       | When true, the web app module is enabled.  | false         |

:::note
`*` can be replaced with `camunda.operate` or `camunda.tasklist` depending on the deployment context, but both are now part of the Orchestration Cluster.
:::

## Scaling

You can run multiple Importer nodes to increase throughput. Internally, each node handles specific Zeebe partitions.

Configuration for each node:

| Configuration parameter       | Description                                         | Default value                                       |
| ----------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `*.clusterNode.partitionIds`  | Array of Zeebe partition IDs this node must handle. | Empty array, meaning all partitions data is loaded. |
| `*.clusterNode.nodeCount`     | Total number of Importer nodes in the cluster.      | 1                                                   |
| `*.clusterNode.currentNodeId` | ID of current Importer node, starting from 0.       | 0                                                   |

:::note
You only need to configure either `partitionIds` or a pair of `nodeCount` and `currentNodeId`. `nodeCount` always represents the number of nodes of one specific type.
:::

Example cluster configuration with one web app node and two importer nodes:

```yaml
# Webapp node
camunda.*:
  importerEnabled: false
  # other configuration...

# Importer node #1
camunda.*:
  webappEnabled: false
  clusterNode:
    nodeCount: 2
    currentNodeId: 0
  # other configuration...

# Importer node #2
camunda.*:
  webappEnabled: false
  clusterNode:
    nodeCount: 2
    currentNodeId: 1
  # other configuration...
```

### Parallelization

Within a single node, you can configure multiple threads for importing:

| Configuration parameter   | Description                          | Default value |
| ------------------------- | ------------------------------------ | ------------- |
| `*.importer.threadsCount` | Number of threads for importing data | 3             |

:::note
Thread parallelization also respects Zeebe partitions. Too many threads or nodes may result in idle threads if `(nodes) * (threadsCount) > total Zeebe partitions`.
:::

### Notes for migration

- The Importer is **only run temporarily** during migration to import existing Zeebe data into the Orchestration Cluster.
- Continuous import is not required for normal cluster operation.

Example temporary Importer configuration:

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
