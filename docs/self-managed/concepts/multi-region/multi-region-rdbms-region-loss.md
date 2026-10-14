---
id: multi-region-rdbms-region-loss
title: "Region loss and recovery in Multi-Region RDBMS"
sidebar_label: "Region loss and recovery"
description: "How a Multi-Region RDBMS cluster behaves when a region disappears, how long recovery takes, and when to remove a lost zone."
---

import PageDescription from '@site/src/components/PageDescription';
import RegionLossDiagram from './img/multi-region-rdbms-region-loss.svg';
import RemoveZoneImg from './img/multi-region-rdbms-remove-zone.svg';
import RecoveryWindowImg from './img/multi-region-rdbms-recovery-window.svg';

<PageDescription />

Learn how a [Multi-Region RDBMS](./multi-region-rdbms.md) cluster behaves when it loses a region, and how it recovers. A region loss is an unplanned change, unlike [growing the cluster](./multi-region-rdbms-growth.md).

<RegionLossDiagram role="img" title="Losing london in a 2-2-1 layout. London held two replicas and the database writer. Paris, with two replicas and the standby, and zurich, with one replica and no database, keep three of five replicas, so the quorum holds." />

With a `2-2-1` replica layout across three regions, each partition has five replicas. Losing one region leaves three or four replicas per partition, preserving quorum as long as every declared zone runs and no zone holds half the replicas or more. Partitions whose leader was in the lost region briefly pause while a new leader is elected; other partitions continue processing. No operator action is needed to restore Zeebe quorum.

:::warning Two things need attention

If the writer was in the lost region, promote a surviving member. A planned switchover loses no data. An unplanned promotion loses whatever had not replicated at the time of the outage, bounded by the replication lag your [asynchronous replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) strategy allows. Camunda itself needs no reconfiguration as long as the JDBC URL keeps resolving to the current writer.

Camunda clients take one REST address and one gRPC address, not a list of endpoints. Point them at one address that fails over. For example, use a DNS record with health checks and failover routing, or a global load balancer in front of the regional load balancers. Most providers offer both, for example Amazon Route 53 and AWS Global Accelerator, Azure Traffic Manager and Azure Front Door, or Google Cloud DNS routing policies and Cloud Load Balancing.

:::

To recover, redeploy the region. There is nothing to restore: its brokers catch up from the surviving replicas, as they would after a node restart. For the step-by-step procedure, see [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md).

## Recovery objectives {#recovery-objectives}

With three or more running regions, and no zone holding half the replicas or more, a region loss needs no recovery procedure, but it still opens a recovery window. For other layouts, see [Remove a lost zone](#remove-a-lost-zone).

Under those conditions, recovery needs no procedure, because on the engine a zone loss is the same class of event as a broker loss.

A single-region cluster that loses a broker holds a Raft re-election for the partitions that broker led, and its clients reconnect to the new leaders. Losing a zone runs the same sequence over the same protocol:

- No restore, and no backup to replay.
- No judgment call about whether the failure is temporary or permanent.

That is the difference from [Dual-Region](./dual-region.md), where the same event costs the quorum and processing stops until an operator intervenes.

Recovery has a window, because reconfiguration takes time. Most of that window depends on settings outside the engine: client timeouts and retries, traffic routing, database failover, and Camunda's own SQL connection timeouts. This section therefore gives the order of magnitude of each part instead of one RTO figure.

Data loss depends on which store you mean. Primary storage contains Zeebe's replicated log and runtime state. With the quorum-preserving layout described above, losing one region causes no loss of committed primary-storage data. Retention of log records for secondary-storage recovery depends on the configured replication-monitoring strategy, as described below.

Raft commits a record only once a majority of its replicas hold it. With a `2-2-1` replica layout across three regions, a commit needs three replicas of five. Losing one zone removes at most two, so at least one surviving replica has the record.

Secondary storage is different, because the database replicates asynchronously. In the table, `min-sync-replicas` stands for `camunda.data.secondary-storage.rdbms.async-replication.min-sync-replicas`, the number of standbys that must confirm a record. An unplanned promotion can omit records that had not reached the promoted standby.

| Strategy   | Secondary-storage RPO | Condition                                                                                                                        |
| :--------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `LOG_SEQ`  | 0                     | The promoted standby is one of the standbys counted by `min-sync-replicas`. This is always the case with a single standby.       |
| `TIME_LAG` | 0                     | Same as `LOG_SEQ`: the promoted standby is one of the standbys counted by `min-sync-replicas`.                                   |
| `DELAY`    | 0                     | The actual replication lag stays below the configured delay. The exporter observes no replication state, so you monitor the lag. |

The database's own failover can still lose up to its replication lag. Every strategy holds back Zeebe log compaction, so Camunda replays the missing records from the retained log after promotion. The table describes that combined result.

That makes the guarantee conditional on replication configuration and disk capacity rather than on the architecture alone. Retained log segments accumulate for as long as records remain unacknowledged. Size the volume for your write rate and the longest replication outage you plan to tolerate, and alert on broker disk usage.

`pause-on-max-lag-exceeded` decides what happens once the lag passes the configured threshold. It is off by default, and it caps neither data loss nor retained log growth. With `LOG_SEQ` and `TIME_LAG`, acknowledgement waits for confirmed replication either way, so the unacknowledged position holds the log either way. With `DELAY`, acknowledgement only waits for the configured delay and confirms no replication state. With it off, exporting continues against a database that is already behind. With it on, exporting stops, so secondary storage receives nothing new and the APIs reading it fall behind the engine until replication recovers. Enable it deliberately, once you have alerting on replication lag.

<RecoveryWindowImg role="img" title="Timeline after a region loss. Three phases start when the region is lost: Raft re-election inside the engine, client traffic rerouting through your DNS or load balancer, and database writer promotion only if the writer was lost. Bar lengths are illustrative." />

The window has three parts, and only the first happens inside the engine:

| What                      | Typical duration                | Why it takes time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------ | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Raft re-election          | A few seconds                   | Partitions whose leader was in the lost zone have no leader until a follower misses the leader's heartbeats. A follower starts an election after the [`election-timeout`](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#camundaclusterraft), 2.5 seconds by default, which is ten 250 ms heartbeat intervals. With priority election, the preferred replica stands first, and the vote itself is short compared to the timeout. These partitions don't process during that window.                                                                                                                                                                                          |
| Client traffic rerouting  | Tens of seconds to minutes      | The gateway in the lost region is unreachable. Clients pointed at it fail until your traffic management reroutes them. For example, an Amazon Route 53 health check probes every 10 or 30 seconds and marks the endpoint unhealthy after several failed probes. Clients then follow the new record once its TTL expires.                                                                                                                                                                                                                                                                                                                                                                                   |
| Database writer promotion | Under a minute to a few minutes | Only if the writer was in the lost region. Exporting stops until a surviving member is promoted, while the engine keeps processing. This may [affect processing throughput during secondary-storage recovery](#processing-during-secondary-storage-recovery). For Aurora Global Database, a switchover typically takes under 30 seconds on the engine versions listed in the [AWS disaster recovery guide](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html). A failover after an unplanned outage typically completes within a few minutes. The APIs and web applications that read secondary storage serve stale data until exporting resumes. |

These durations come from defaults and vendor documentation, not from a measurement of this architecture. Measure your own window, because your timeouts and your database decide it.

Skewing partition leadership to the writer's zone makes the first of these worse in one specific case. Losing that zone loses most partition leaders at once, so more partitions re-elect simultaneously. That is the price of avoiding an inter-region round trip on every export flush.

Client configuration decides whether the re-election and rerouting windows are visible. A re-election is a window a client retries through, not an outage. That only holds if its timeout and retry budget survives one. A client that gives up on the first refused connection sees the re-election as downtime, in a single-region cluster as much as here.

The window is longer here, because the new leader and the rerouted client can both be a region away. Size client timeouts and retries for a leader change that crosses a region boundary.

## Processing during secondary-storage recovery {#processing-during-secondary-storage-recovery}

Pausing the exporter stops secondary-storage updates but doesn't directly throttle processing.

If [write flow control with dynamic throttling](/self-managed/operational-guides/configure-flow-control/configure-flow-control.md#enable-flow-control) is enabled, it adjusts the write rate based on the exporting rate and backlog. During secondary-storage recovery, a growing backlog can reduce processing throughput and increase client backpressure. Write flow control is disabled by default in Self-Managed.

For log-retention behavior, see [LSN replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#lsn-replication-monitoring), [time-based replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#time-based-replication-monitoring), and [delay backoff replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#delay-backoff-replication-monitoring). The operational procedure covers [capacity planning](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#prerequisites) and [monitoring during recovery](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#monitor-secondary-storage-recovery).

## Remove a lost zone

Whether the lost zone has to be removed depends on the replicas it held, not on how many zones there are. A partition keeps its quorum as long as the lost zone held fewer than half its replicas:

- Under a layout that satisfies this, such as a `2-2-1` replica layout across three zones, the majority holds. Processing continues whether or not you remove the zone.
- When one zone holds half the replicas or more, losing that zone costs the quorum. Processing only resumes once the zone is removed from the partition distribution.

<RemoveZoneImg role="img" title="Two layouts lose their first zone. In 2-2-1, losing london leaves three of five replicas: the majority holds and removing the zone is optional. In 4-1-1, losing zone A leaves two of six replicas: there is no majority, and processing resumes only after you remove the zone. In both cases, remove the zone once you confirm it is down. You must add a removed zone back, and its brokers rebuild." />

An evenly split two-zone cluster, such as the `2-2` bootstrap, always loses its quorum with a zone. Bring the lost zone back before you add the third region. The same limit applies to [Dual-Region](./dual-region.md). An uneven two-zone layout keeps its quorum only when it loses the smaller zone.

In a cluster with three or more zones, remove a lost zone once you confirm that it is down and won't come back soon. The [operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#4-remove-the-lost-zone) has the command.

After the removal, raise the replicas of the remaining zones if the layout needs it. Losing a two-replica zone of a `2-2-1` layout leaves `2-1`. Raise the one-replica zone to two, to get `2-2`, through the [Partitioning API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#partitioning-api). Losing the one-replica zone leaves `2-2`, so the remaining zones need no change.

Removal makes failback slower. You must add the zone back explicitly, and its brokers then rebuild their state. The rebuild is automatic and can take a few minutes. Its duration depends on the number of active process instances, not on the data in secondary storage.
