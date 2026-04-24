---
id: rebalancing
title: "Rebalancing"
description: "Step through manual rebalancing, limitations, priority election with round-robin distribution, priority election with fixed distribution, and more."
---

Rebalancing is re-electing partition leaders so they are evenly distributed across all brokers. An even leader distribution is beneficial as all brokers share the work of being partition leaders.

Zeebe will, by default, prefer an even leader distribution when electing new leaders, but will not trigger a re-election unless a leader becomes unavailable.

When a Zeebe cluster uses an uneven leader distribution, caused by losing a leader and thus electing a suboptimal broker as new leader for example, manually requesting rebalancing can restore the cluster to an even leader distribution.

## Manual rebalancing

The gateway exposes an HTTP API to request rebalancing. You can use it by `POST`ing to the `/actuator/rebalance` endpoint on the monitoring port of the gateway:

```bash
curl -X POST https://{zeebe-gateway}:9600/actuator/rebalance
```

The result of this operation is always `200 OK` with no body, even when rebalancing is [not supported](#limitations) by the current configuration or when not all leaders have been contacted.

Track the rebalancing progress by observing [metrics](/self-managed/operational-guides/monitoring/metrics.md).
During the rebalancing, partitions might become unhealthy and can't make progress until a new leader is elected.

### Limitations

Manual rebalancing is not guaranteed to succeed in all cases.

Rebalancing is only supported under specific configurations, and even when supported, the resulting distribution cannot be guaranteed due to the nature of distributed systems.

There are two configurations where manual rebalancing is supported:

- **Priority election** with **round-robin distribution**
  - Priority election and round-robin distribution are enabled by default.
  - As long as you have not manually disabled priority election or set a fixed distribution, rebalancing is supported.
  - Brokers are automatically assigned as primary partition leaders during startup, based on cluster size and replication factor.

- **Priority election** with **fixed distribution**
  - Fixed distribution is an experimental configuration that is disabled by default.
  - Brokers are assigned as primary partition leaders based on the configuration.
  - Only configurations where a partition designates a single broker as primary partition leader are supported.

**Priority election** is controlled by the `zeebe.broker.cluster.raft.enablePriorityElection` config and is enabled by default.

Learn more about [priority election](../configuration/priority-election.md).

**Partition distribution** is controlled by the `zeebe.broker.experimental.partitioning` config options.
The default scheme is `ROUND_ROBIN`.

All other configurations are not supported and a manual rebalancing will silently fail.
The rebalancing request is successfully completed by the gateway, but leaders will ignore the request and no re-election is triggered.

Even when a rebalancing request is handled successfully by all leaders, the result of the re-election process is not guaranteed.
Followers that are not fully caught up with the leader cannot be elected as leader.
This becomes more likely under high load or with increased network latency between leader and follower.

### Caveats

:::note

Rebalancing causes every partition leader to step down simultaneously, triggering a new leader election for each partition.

If the desired leader for a partition (aka the node with the highest priority) is _already_ the leader, rebalancing is a no-op for this partition. This means that if a cluster is already perfectly balanced, a rebalancing call is a no-op.

:::

During the election period, the affected partition has no leader. While leaderless, a partition cannot process or export, and cannot accept new commands. In the worst case — when all partitions are rebalancing at the same time — this means the entire cluster is temporarily unavailable: no workflow engine processing occurs, no new data becomes visible in the web applications, and no client requests are accepted.

This is typically observed externally as:

- **Increased error rates** from clients, as requests are rejected while no leader is available
- **Increased processing latency**, for example, service tasks complete later and process instances progress more slowly
- **Increased exporting latency**, for example, new data appears in Operate later than expected

### When to rebalance

Before triggering a rebalance, verify that it is likely to succeed. As described in [Limitations](#limitations), rebalancing only works if the desired leader for each partition is not lagging behind the current leader. You can verify this using the `atomix_non_replicated_entries` metric, filtering by the `partition` and `follower` labels to see how far behind a given replica is for a given partition. The closer this value is to `0`, the more likely rebalancing is to succeed. If the desired leader has a significant lag, triggering a rebalance will cause a temporary performance drop without achieving a better distribution.

:::note

If you are using Prometheus, you can query the replication lag for a given partition and desired leader with:

```promql
sum(atomix_non_replicated_entries{partition=~"$partition", follower=~"$follower"}) by (partition, follower)
```

Replace `$partition` and `$follower` by the desired combination.

If you're using the Zeebe Grafana dashboard, you can already visualize this in the `Raft` section, in a graph named `Non replicated records`.

:::

Once you have confirmed that rebalancing is likely to succeed, consider the trade-off: rebalancing can improve long-term cluster performance by achieving an optimal leader distribution, but it causes a temporary performance impact and potential unavailability window. You must decide whether the long-term benefit outweighs the short-term disruption for your situation.

:::warn

We recommend rebalancing only when the cluster is under low load. To determine this, identify what "low load" means for your specific scenario. What constitutes low load, and whether rebalancing is appropriate at all in a given situation, is ultimately your decision.

:::

For example, you could consider the cluster idle if the total leader append rate across all partitions is low, such as below 64 KB/s. At this level of activity, the impact of a rebalance on your users and applications is minimal.

:::note

If you are using Prometheus, you can query the total replication rate across all partitions with:

```promql
sum(rate(atomix_append_entries_data_rate_total[1m]))
```

This returns the replication rate in bytes per second of a cluster.

You can find this in the Zeebe Grafana dashboard under the `Raft` section, visualized as a graph named `Leader append data rate`.

:::
