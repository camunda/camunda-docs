---
id: fixed-partitioning
title: "Fixed partitioning"
description: "Manually configure which partitions belong to which brokers."
---

Starting with 1.2.0, there is a new experimental configuration option which lets you specify a fixed partitioning scheme; this means you can manually configure which partitions belong to which brokers.

The partitioning scheme is controlled via a new configuration option under `zeebe.broker.experimental.partitioning`,
more specifically `zeebe.broker.experimental.partitioning.scheme`. This option currently takes the following values:

- `ROUND_ROBIN`: When set, this applies the round-robin partition distribution, which corresponds to the distribution explained above on this page. _This is the default option, and requires no extra configuration if you want to use it._
- `FIXED`: When set, this applies a manually configured partition distribution, configured separately.

To use the `FIXED` partitioning scheme, _you must provide an exhaustive map of all partitions to a set of brokers_. This is achieved via the `zeebe.broker.experimental.partitioning.fixed` configuration option. The example below outlines a cluster of `5` brokers, `3` partitions, and a replication factor of `3`.

```yaml
partitioning:
  scheme: FIXED
  fixed:
    - partitionId: 1
      nodes:
        - nodeId: 0
        - nodeId: 2
        - nodeId: 4
    - partitionId: 2
      nodes:
        - nodeId: 1
        - nodeId: 3
        - nodeId: 4
    - partitionId: 3
      nodes:
        - nodeId: 0
        - nodeId: 2
        - nodeId: 3
```

This configuration will produce the following distribution:

|             | Node 0 | Node 1 | Node 2 | Node 3 | Node 4 |
| ----------: | :----: | :----: | :----: | :----: | :----: |
| Partition 1 |   X    |        |   X    |        |   X    |
| Partition 2 |        |   X    |        |   X    |   X    |
| Partition 3 |   X    |        |   X    |   X    |        |

## Validation

Each broker performs reasonableness checks on the `FIXED` configuration provided. Namely, the configuration must uphold the following conditions:

- All partitions _must be explicitly configured_.
- All partitions configured must have valid IDs, i.e. between 1 and `zeebe.broker.cluster.partitionsCount`.
- All partitions must configure exactly the replicas count, i.e. `zeebe.broker.cluster.replicationFactor`.
- All nodes configured for a partition have a valid node ID, i.e. between 0 and `zeebe.broker.cluster.clusterSize - 1`.
- If priority election is enabled, all priorities configured for a partition are different.

The broker will fail to start if any of these conditions are not met.

## Priority election

If you're using the priority election feature, you must also specify the priorities of each broker. In fact, the broker will fail to start if the nodes do not have different priorities, as otherwise you may encounter lengthy election loops.

Here is the same example configuration as above, but this time with priorities configured:

```yaml
partitioning:
  scheme: FIXED
  fixed:
    - partitionId: 1
      nodes:
        - nodeId: 0
          priority: 1
        - nodeId: 2
          priority: 2
        - nodeId: 4
          priority: 3
    - partitionId: 2
      nodes:
        - nodeId: 1
          priority: 1
        - nodeId: 3
          priority: 3
        - nodeId: 4
          priority: 2
    - partitionId: 3
      nodes:
        - nodeId: 0
          priority: 3
        - nodeId: 2
          priority: 2
        - nodeId: 3
          priority: 1
```

:::note
The only condition is that the priorities for the nodes of a given partition must be different from one another. We recommend, however, that you use a simple monotonic increase from 1 to the replica count, as shown above.
:::
