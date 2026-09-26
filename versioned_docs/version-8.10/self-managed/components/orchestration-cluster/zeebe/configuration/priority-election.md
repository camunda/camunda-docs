---
id: priority-election
title: "Priority election"
description: "An alternative to the default raft leader election."
---

Priority election is an alternative to the default raft leader election, where leader election is implemented by a random timer-based algorithm.

It aims to achieve a more uniform leader distribution by assigning each node a priority per partition and modifying the election algorithm to ensure nodes with higher priority have a higher chance of becoming leader.

## Configuration

Enable priority election by setting `zeebe.broker.cluster.raft.enablePriorityElection=true` in your config or
by setting the equivalent environment variable `ZEEBE_BROKER_CLUSTER_RAFT_ENABLEPRIORITYELECTION=true`.

If you are using the fixed partitioning scheme (experimental), you may need [additional configuration](fixed-partitioning.md#priority-election).

## Limitations

With priority election enabled, election latency and thus failover time increases.

The result of a leader election is not deterministic, and priority election can only increase the chance of having a
uniform leader distribution, not guarantee it.

Factors such as high load can prevent high-priority nodes from becoming the leader.
