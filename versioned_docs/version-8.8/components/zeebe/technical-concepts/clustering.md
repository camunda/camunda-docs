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

Data is divided into partitions (shards). Each partition has a number of replicas. Among the replica set, a **leader** is determined by the raft protocol, which takes in requests and performs all of the processing. All other brokers are passive **followers**. When the leader becomes unavailable, the followers transparently select a new leader.

Each broker in the cluster may be both leader and follower at the same time for different partitions. In an ideal world, this leads to client traffic distributed evenly across all brokers.

![cluster](assets/data-distribution.png)

:::note
There is no active load balancing across partitions. Each leader election for any partition is autonomous and independent of leader elections for other partitions.

This may lead to one node becoming the leader for all partitions. This is not a problem for fault tolerance as the guarantees of replication remain. However, this may negatively impact throughput as all traffic hits one node.

To reach a well-distributed leadership again, the [Rebalancing API](../../../self-managed/zeebe-deployment/operations/rebalancing.md) can be used in Self-Managed environments. Be aware that this is on a best-effort basis.
:::

## Commit

Before a new record on a partition can be processed, it must be replicated to a quorum (typically majority) of brokers. This procedure is called **commit**. Committing ensures a record is durable, even in case of complete data loss on an individual broker. The exact semantics of committing are defined by the raft protocol.

![cluster](assets/commit.png)
