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

Track the rebalancing progress by observing [metrics](./metrics.md).
During the rebalancing, partitions might become unhealthy and can't make progress until a new leader is elected.

### Limitations

Manual rebalancing is done on a best-effort basis.

Due to the nature of distributed systems, Zeebe can never guarantee a particular distribution and rebalancing cannot avoid that.

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

We recommend requesting rebalancing only under low load.
