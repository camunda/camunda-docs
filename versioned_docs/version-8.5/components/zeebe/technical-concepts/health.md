---
id: health
title: "Health"
description: "This document explains how health is defined in a Zeebe cluster."
---

# Health

Health in Zeebe is not a binary status, but can have three different state:

- **Healthy**: everything is working as expected.
- **Unhealthy**: at least parts of the system are in a degraded state.
- **Dead**: one or more parts of the cluster experienced non-recoverable failure.

## Unhealthy

When a node in a Zeebe cluster is unhealthy, it means parts of the system may not work. This is often a transient state: for example, when a node is
starting, it starts in an unhealthy state, as several components (e.g. a partition, the workflow engine, etc.) are not yet installed or ready for
operation.

When this is temporary, and the cluster overall converges to a steady healthy state, you can safely ignore these temporary signals. However, if things
persist, or if you see flip-flopping between healthy and unhealthy, it can be an indicator of an underlying issue which requires investigation.

:::note
Note that even if parts of the cluster are unhealthy, it can be that other parts are still working fine.
:::

## Dead

When something is marked as dead in a cluster, it means it failed in a non-recoverable way. This means it **will** require human intervention to recover.
This is a rare status, but it can happen if data corruption is detected, for example. We recommend prompt investigation into any components with a dead
status.

:::note
Note that it's possible that only parts of the system has failed, and the rest is still working fine. For example, A dead broker can be due to a single
partition which has data corruption; other partitions on the same broker may still be processing and working as expected.
:::

## Cluster

The health of a cluster depends on the deployment topology. More specifically, the health of a cluster is based on the expected number of brokers,
gateways, partitions, and the replication factor.

:::note
If using embedded gateways - that is, where brokers act as gateways - then you can ignore the gateway part.
:::

Informally, a healthy cluster is one where the the expected number of
[brokers and gateways report a healthy status](../../../self-managed/zeebe-deployment/operations/health.md), where every partition has exactly one leader, and
there are `N-1` followers per partition (where `N` is the replication factor).

More formally, given `G` the number of expected gateways, `B` the number of expected brokers, `P` the partition count, and `R` the replication factor, we can
define the health of a cluster as:

- There are `G` gateway nodes which are report a healthy status via their health check
- There are `B` broker nodes which are healthy a healthy status via their health check
- For every partition from `1..P`:
  - There is exactly one leader broker
  - There are `R-1` follower brokers

For example, given we expect 3 brokers, 3 partitions, and a replication factor of 3, a healthy cluster would show the following topology:

```
Cluster size: 3
Partitions count: 3
Replication factor: 3
Gateway version: 8.7.1
Brokers:
  Broker 0 - zeebe-0.internal.local
    Version: 8.7.1
    Partition 1 : Leader, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
  Broker 1 - zeebe-1.internal.local
    Version: 8.7.1
    Partition 1 : Follower, Healthy
    Partition 2 : Leader, Healthy
    Partition 3 : Follower, Healthy
  Broker 2 - zeebe-2.internal.local
    Version: 8.7.1
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Leader, Healthy
```

We can see that the topology reports the expected number of brokers, and that for every partition there is exactly one leader, two followers, and all partitions are healthy.

## Partition

[Partitions](./partitions.md) are distributed across multiple nodes. In a cluster, all partitions have the
same replication factor, which defines on how many nodes a partition's data will live. For example, given a replication factor of 3, exactly 3 brokers
in the cluster will store the partition's data. In other words, that partition is a distributed system across those 3 nodes: it is made of discrete parts
that exist on different nodes, separated by a network, but it is acts conceptually as a single system.

A partition can have the following health status: `HEALTHY`, `UNHEALTHY`, or `DEAD`.

A partition is considered healthy if:

- It has exactly one healthy leader in the cluster. A healthy leader is one who can:
  - Replicate to [a quorum of followers](./clustering.md#raft-consensus-and-replication-protocol).
  - [Process data](./internal-processing.md).
- It has at least `floor(N/2)` healthy followers in the cluster. With this amount of followers and the leader, data can be
  [committed](./clustering.md#commit).

Anything short of this represents an unhealthy partition:

- Having multiple leaders in a cluster would prevent Zeebe from guaranteeing processing consistency.
- Having fewer than `floor(N/2)` healthy followers would prevent the leader from committing.
  - This would block processing, which would cause all requests to time out, and make the partition functionally unavailable.
- Having **no** leader would be similar: nothing would be committed, and as such, nothing processed.

A dead partition represents one which has failed in a non-recoverable way. This is exceptional, and always requires human intervention. Examples of dead
partitions are:

- Data corruption was detected. Since the engine is a stream processing application, we cannot skip any entries, meaning everything is stopped.
  - This can include detection of gaps or missing data.

## Broker

The health of a broker is computed from the health of its component tree. While there are many components in the broker, it's sufficient
to understand that a broker is considered:

- **Healthy** if and only if all components in the tree are healthy.
- **Unhealthy** if at least one component is unhealthy.
- **Dead** if at least one component is dead.

There are many components in a broker, but most importantly, each partition in a broker is a separate, independent component. As such, you can roughly
define the health of a broker as the sum of the health of its partitions.

The health of a broker is reported via its [status health check](../../../self-managed/zeebe-deployment/operations/health.md#broker).
