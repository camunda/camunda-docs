---
id: rebalancing
title: "Rebalancing"
description: "Step through manual rebalancing, limitations, priority election with round-robin distribution, priority election with fixed distribution, and more."
---

Rebalancing is re-electing partition leaders so they are evenly distributed across all brokers. An even leader distribution is beneficial as all brokers share the work of being partition leaders.

Zeebe will, by default, prefer an even leader distribution when electing new leaders, but will not trigger a re-election unless a leader becomes unavailable.

When a Zeebe cluster uses an uneven leader distribution, caused by losing a leader and thus electing a suboptimal broker as new leader for example, manually requesting rebalancing can restore the cluster to an even leader distribution.

## Manual rebalancing

Request rebalancing through the coordinated rebalancing API under `/cluster/v2/rebalance` using [cluster admin](/components/admin/cluster-admin.md) credentials. Unlike an open election, this API transfers leadership for each partition directly to its highest-priority replica, one partition at a time, so at most one partition is affected at any moment.

Start a rebalance ([`POST /cluster/v2/rebalance`](/apis-tools/orchestration-cluster-api-rest/specifications/trigger-cluster-rebalance.api.mdx)):

```bash
curl -X POST https://{cluster-host}/cluster/v2/rebalance
```

Check the cluster's balance state and the progress of each partition ([`GET /cluster/v2/rebalance`](/apis-tools/orchestration-cluster-api-rest/specifications/get-cluster-rebalance.api.mdx)):

```bash
curl -X GET https://{cluster-host}/cluster/v2/rebalance
```

Stop a running rebalance once the transfer in flight has finished ([`DELETE /cluster/v2/rebalance`](/apis-tools/orchestration-cluster-api-rest/specifications/cancel-cluster-rebalance.api.mdx)):

```bash
curl -X DELETE https://{cluster-host}/cluster/v2/rebalance
```

To preview the plan a rebalance would carry out, without pausing any partition or moving any leadership, pass `dryRun=true`:

```bash
curl -X POST "https://{cluster-host}/cluster/v2/rebalance?dryRun=true"
```

Each partition reports how its transfer ended or why it was skipped (already led by the desired leader, replication lag too high, replication timed out, and so on).

A `POST /cluster/v2/rebalance` request accepts an optional JSON body to override the rebalancing parameters for the request - any omitted parameters will use the configured defaults:

```bash
curl -X POST https://{cluster-host}/cluster/v2/rebalance \
  -H 'Content-Type: application/json' \
  -d '{ "replicationLagThreshold": 8388608, "replicationTimeout": "PT10S", "maxTransferAttempts": 3, "leaderWaitTimeout": "PT1M" }'
```

- `replicationLagThreshold`: maximum replication lag, in bytes, a desired leader may have for its transfer to be accepted. Defaults to `8388608` (8 MB).
- `replicationTimeout`: an ISO-8601 duration for how long a partition may stay frozen waiting for its desired leader to catch up before the transfer is abandoned. Defaults to `PT10S` (10 seconds)
- `maxTransferAttempts`: how many times the current leader prompts the desired leader to take over before giving up. Defaults to `3`.
- `leaderWaitTimeout`: an ISO-8601 duration for how long the coordinator waits for a leaderless partition to elect a leader before reporting `NO_LEADER` and moving on. Defaults to `PT1M` (1 minute)

The default values for these parameters are configurable as broker options (see the [`camunda.cluster.raft.rebalance` properties reference](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#camundaclusterraftrebalance)).

:::note

The previous `/actuator/rebalance` endpoint is deprecated but still available.

:::

Track the rebalancing progress with `GET /cluster/v2/rebalance`, or by observing the `zeebe_cluster_rebalance_elapsed`, `zeebe_cluster_rebalance_partition_duration`, `zeebe_cluster_rebalance_partition_state`, and `zeebe_cluster_partition_balanced` [metrics](/self-managed/operational-guides/monitoring/metrics.md). The Zeebe Grafana dashboard has a dedicated `Rebalancing` section covering cluster balance, per-partition rebalance state and outcomes, and how long partitions stay paused for transfer.

### Limitations

Manual rebalancing is not guaranteed to succeed for every partition in every attempt, but it never fails silently: each partition transfer ends in an explicit, reported outcome, and a partition that cannot be rebalanced keeps its current leader rather than being left leaderless.

Before transferring leadership for a partition, the coordinator checks the desired leader's replication lag against `replicationLagThreshold`. If the lag is already too high, the transfer is rejected immediately with `LAG_TOO_HIGH` and the partition does not enter the paused state.

If the lag is within tolerance, the partition is paused and the desired leader is given up to `replicationTimeout` to catch up:

- If it catches up in time, leadership transfers to it and the pause is lifted.
- If it doesn't, the transfer ends with `REPLICATION_TIMED_OUT` and the partition resumes under its current leader.

Once caught up, the coordinator prompts the desired leader to take over, retrying up to `maxTransferAttempts` times. If leadership still hasn't moved, the transfer ends with `TIMEOUT_NOW_EXHAUSTED` and the partition again resumes under its current leader.

### Rebalancing impact

:::note

Rebalancing transfers partitions one at a time, so at most one partition is affected at any moment.

If the desired leader for a partition (the node with the highest priority) is _already_ the leader, rebalancing is a no-op for this partition. If a cluster is already perfectly balanced, a rebalancing call is a no-op.

:::

While a partition is paused for transfer, it cannot process, export, or accept new commands, and it briefly has no leader during the handoff itself. Because partitions transfer one at a time, this affects only the partition currently being rebalanced, not the whole cluster.

This is typically observed externally as:

- Increased error rates from clients, for requests routed to the paused partition
- Increased processing latency, as service tasks on that partition complete later and process instances on it progress more slowly
- Increased exporting latency, as new data from that partition appears in Operate later than expected

### When to rebalance

The `GET /cluster/v2/rebalance` endpoint exposes a live balance status for the cluster, indicating which (if any) partitions are not currently led by the desired leader. If you are using the Zeebe Grafana dashboard, this information is also visible in the `Rebalancing` section.

:::warn

Generally, you should rebalance when your cluster is under low load to avoid disruptions to throughput and latency (as well as maximising the effectiveness of the rebalance, i.e. what percentage of unbalanced partitions are successfully transferred).

:::

If it is necessary to rebalance while under load, you can use the available parameters to manage the trade-off between disruption and effectiveness of the rebalance: tuning `replicationLagThreshold` and `replicationTimeout` higher will increase effectiveness at the cost of greater temporary disruption, while lowering them will decrease disruption at the cost of potentially transferring fewer partitions.

As described in [Limitations](#limitations), rebalancing only works if the desired leader for each partition is not lagging too far behind the current leader. You can verify this using the `zeebe_raft_replication_lag_bytes` metric, filtering by the `partition` and `follower` labels to determine how far a replica lags behind, in bytes. This is the same value the coordinated rebalancing API checks against `replicationLagThreshold` before accepting a transfer. The closer this value is to `0`, the more likely rebalancing is to succeed. If the desired leader has a significant lag, triggering a rebalance will likely cause a temporary performance drop without achieving a better distribution.

:::note

If you are using Prometheus, you can query the replication lag for a given partition and desired leader with:

```promql
sum(zeebe_raft_replication_lag_bytes{partition=~"$partition", follower=~"$follower"}) by (partition, follower)
```

Replace `$partition` and `$follower` by the desired combination.

The Zeebe Grafana dashboard visualizes this information in the `Raft` section (in a graph named `Follower replication lag`).

:::

Once you have confirmed that rebalancing is likely to succeed, consider the trade-off: rebalancing can improve long-term cluster performance by achieving an optimal leader distribution, but it causes a temporary performance impact and potential unavailability window. Decide whether the long-term benefit outweighs the short-term disruption.

:::note

If you are using Prometheus, you can query the total replication rate across all partitions with:

```promql
sum(rate(atomix_append_entries_data_rate_total[1m]))
```

This returns the cluster replication rate in bytes per second.

You can find this in the Zeebe Grafana dashboard under the `Raft` section, visualized as a graph named `Leader append data rate`.

:::
