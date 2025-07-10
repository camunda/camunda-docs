---
id: clustering
title: "Clustering"
description: "Zeebe can operate as a cluster of brokers, forming a peer-to-peer network."
---

Zeebe can operate as a cluster of brokers, forming a peer-to-peer network.

In this network, all brokers have the same responsibilities and there is no single point of failure.

![cluster](assets/cluster.png)

## Gossip membership protocol

Zeebe implements the [gossip protocol](https://en.wikipedia.org/wiki/Gossip_protocol) to know which brokers are currently part of the cluster.

The cluster is bootstrapped using a set of well-known bootstrap brokers, to which the others can connect. To achieve this, each broker must have at least one bootstrap broker as its initial contact point in their configuration:

```yaml
---
cluster:
  initialContactPoints: [node1.mycluster.loc:26502]
```

When a broker is connected to the cluster for the first time, it fetches the topology from the initial contact points and starts gossiping with the other brokers. Brokers keep cluster topology locally across restarts.

## Raft consensus and replication protocol

To ensure fault tolerance, Zeebe replicates data across servers using the [raft protocol](<https://en.wikipedia.org/wiki/Raft_(computer_science)>).

Data is divided into partitions (shards). Each partition has a number of replicas. Among the replica set, a **leader** is determined by the Raft protocol, which takes in requests and performs all the processing. All other brokers are passive **followers**. When the leader becomes unavailable, the followers transparently select a new leader.

Each broker in the cluster may be both leader and follower at the same time for different partitions. In an ideal world, this leads to client traffic distributed evenly across all brokers.

![cluster](assets/data-distribution.png)

:::note
There is no active load balancing across partitions. Each leader election for any partition is autonomous and independent of leader elections for other partitions.

This may lead to one node becoming the leader for all partitions. This is not a problem for fault tolerance as the guarantees of replication remain. However, this may negatively impact throughput as all traffic hits one node.

To reach a well-distributed leadership again, the [Rebalancing API](../../../self-managed/components/orchestration-cluster/zeebe/operations/rebalancing.md) can be used in Self-Managed environments. Be aware that this is on a best-effort basis.
:::

## Commit

Before a new record on a partition can be processed, it must be replicated to a quorum of brokers, and this majority of followers has to confirm the received record. When the leader received these confirmations from half or more of its followers, the leader **commits** the record. Committing ensures a record is durable, even in case of complete data loss on an individual broker. The exact semantics of committing are defined by the raft protocol.

![cluster](assets/commit.png)

A well-balanced replication ensures records can be committed even when one or more brokers will become unavailable, but the majority of brokers are still available. **Odd replication factors** [are recommended](partitions.md#replication).

Examples for common replication factors and their quorum:

| Replication factor | Description           | Quorum                                                      | Use case                                                                         |
| :----------------: | --------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
|         3          | 1 leader, 2 followers | Half or more of 2 followers is 1 follower that confirmed.   | Single region, 3 availability zones. One broker can go down without losing data. |
|         5          | 1 leader, 4 followers | Half or more of 4 followers are 2 followers that confirmed. | Allows a higher tolerance against the loss of 2 brokers.                         |

The only exception to have **even replication factors** is the [dual region setup](../../../self-managed/concepts/multi-region/dual-region.md). In this setup, an even replication factor ensures records are always replicated to both regions. In the case of losing a whole region, every new request will be denied, as no replication can get a quorum anymore. All partitions will become unhealthy, and operators start their [failover procedure](../../../self-managed/components-upgrade/multi-region/dual-region-ops.md). No data is lost.

Using an odd replication factor in a dual region setup would favor some partitions, where the leader and the majority of followers live in the surviving region, against the partitions that have only a minority of followers survived. This may slow down to detect a region loss, as some process instances still continue while others are stuck.

Below is one example for replication and quorum used in the [dual region setup guide](../../../self-managed/setup/deploy/amazon/amazon-eks/dual-region.md#content-elaboration):

| Replication factor | Description           | Quorum                                                      | Use case                                                                                                                                                                                                                 |
| :----------------: | --------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|         4          | 1 leader, 3 followers | Half or more of 3 followers are 2 followers that confirmed. | Exception for dual-region with minimal replication, records always replicated to both regions [following the recommended setup](../../../self-managed/concepts/multi-region/dual-region.md#zeebe-cluster-configuration). |
