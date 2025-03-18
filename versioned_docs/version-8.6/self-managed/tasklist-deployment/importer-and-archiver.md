---
id: importer-and-archiver
title: Importer and archiver
description: "Let's analyze how Tasklist is organized by modules to import and archive data."
---

Tasklist consists of three modules:

- **Web app**: Contains the UI and operation executor functionality.
- **Importer**: Responsible for importing data from Zeebe.
- **Archiver**: Responsible for archiving "old" data (finished process instances and user operations.) See [data retention](data-retention.md).

## Configuration

Modules can be run together or separately in any combination and can be scaled. When you run a Tasklist instance, by default, all modules are enabled. To disable them, use the following configuration parameters:

| Configuration parameter          | Description                            | Default value |
| -------------------------------- | -------------------------------------- | ------------- |
| camunda.tasklist.importerEnabled | When true, Importer module is enabled. | true          |
| camunda.tasklist.archiverEnabled | When true, Archiver module is enabled. | true          |
| camunda.tasklist.webappEnabled   | When true, Webapp module is enabled.   | true          |

## Scaling

Additionally, you can have several importer and archiver nodes to increase throughput. Internally, they will spread their work based on Zeebe partitions.

:::warning
Running multiple importers on the same partition may result in wrong usage metrics.
:::

For example, if your Zeebe runs 10 partitions and you configure two importer nodes, they will import data from five partitions each.

Each single importer/archiver node must be configured using the following configuration parameters:

| Configuration parameter                    | Description                                                                            | Default value                                       |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------- |
| camunda.tasklist.clusterNode.partitionIds  | Array of Zeebe partition ids this importer (or archiver) node must be responsible for. | Empty array, meaning all partitions data is loaded. |
| camunda.tasklist.clusterNode.nodeCount     | Total amount of Importer (or archiver) nodes in the cluster.                           | 1                                                   |
| camunda.tasklist.clusterNode.currentNodeId | ID of current Importer (or archiver) node, starting from 0.                            | 0                                                   |

It's enough to configure either `partitionIds` or a pair of `nodeCount` and `currentNodeId`. If you provide `nodeCount` and `currentNodeId`, each node will automatically determine the Zeebe partitions they're responsible for.

:::note
`nodeCount` always represents the number of nodes of one specific type.
:::

For example, the configuration of a cluster with one web app node, two importer nodes, and one archiver node could look like the following:

```
Webapp node

camunda.tasklist:
  archiverEnabled: false
  importerEnabled: false
  #other configuration...

Importer node #1

camunda.tasklist:
  archiverEnabled: false
  webappEnabled: false
  clusterNode:
    nodeCount: 2
    currentNodeId: 0
  #other configuration...

Importer node #2

camunda.tasklist:
  archiverEnabled: false
  webappEnabled: false
  clusterNode:
    nodeCount: 2
    currentNodeId: 1
  #other configuration...

Archiver node

camunda.tasklist:
  webappEnabled: false
  importerEnabled: false

```

You can further parallelize archiver and/or importer within one node using the following configuration parameters:

| Configuration parameter                | Description                                       | Default value |
| -------------------------------------- | ------------------------------------------------- | ------------- |
| camunda.tasklist.archiver.threadsCount | Number of threads in which data will be archived. | 1             |
| camunda.tasklist.importer.threadsCount | Number of threads in which data will be imported. | 3             |

:::note
Parallelization of import and archiving within one node will also happen based on Zeebe partitions, meaning only configurations with (number of nodes) \* (threadsCount) ≤ (total number of Zeebe partitions) will make sense. Too many threads and nodes will still work, but some of them will be idle.
:::

## Archive period

The time between a process instance finishing and being archived can be set using the following configuration parameter:

| Configuration parameter                             | Description                                  | Default value |
| --------------------------------------------------- | -------------------------------------------- | ------------- |
| camunda.tasklist.archiver.waitPeriodBeforeArchiving | Amount of time before data will be archived. | 1h            |

By default, the archive period is set to "1h" (one hour). This means the data for the finished process instances will be kept in the "main" index for one hour after the process instance has finished, and then it will be moved to a "dated" index.

The syntax for the parameter uses Elasticsearch date math. See the table below for reference:

| Value | Description |
| ----- | ----------- |
| y     | Years       |
| M     | Months      |
| w     | Weeks       |
| d     | Days        |
| h     | Hours       |
| m     | Minutes     |
| s     | Seconds     |
