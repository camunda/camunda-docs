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

This page describes how a [Multi-Region RDBMS](./multi-region-rdbms.md) cluster behaves when it loses a region, and how it recovers. A region loss is an unplanned change, unlike [growing the cluster](./multi-region-rdbms-growth.md).

<RegionLossDiagram role="img" title="Losing london in a 2-2-1 layout. London held two replicas and the database writer. Paris, with two replicas and the standby, and zurich, with one replica and no database, keep three of five replicas, so the quorum holds." />

Losing one region out of three or more removes that region's replicas of every partition. Under the default `2-2-1` layout, that is one or two replicas. The remaining replicas still form a majority if every declared zone runs and no zone holds half the replicas or more. The cluster then keeps its quorum. **You need no operator step to resume processing.** Partitions whose leader was in the lost region pause for a Raft re-election and then continue. Partitions led elsewhere continue without interruption.

:::warning Two things still need attention

**The database writer.** If the writer was in the lost region, promote a surviving member. A planned switchover loses no data. An unplanned promotion loses whatever had not replicated at the time of the outage, bounded by the replication lag your [asynchronous replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) strategy allows. Camunda itself needs no reconfiguration as long as the JDBC URL keeps resolving to the current writer.

**Client traffic.** Camunda clients take one REST address and one gRPC address, not a list of endpoints. Point them at one address that fails over. For example, use a DNS record with health checks and failover routing, or a global load balancer in front of the regional load balancers. Most providers offer both, for example Amazon Route 53 and AWS Global Accelerator, Azure Traffic Manager and Azure Front Door, or Google Cloud DNS routing policies and Cloud Load Balancing.

:::

Recovery is the reverse and has no restore step. Redeploy the region. Its brokers replay from the surviving replicas exactly as they would after a node restart. For the step-by-step procedure, see [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md).

## Recovery objectives {#recovery-objectives}

There is no recovery procedure. There is still a recovery window.

**No procedure**, because on the engine a zone loss is the same class of event as a broker loss.

A single-region cluster that loses a broker holds a Raft re-election for the partitions that broker led, and its clients reconnect to the new leaders. Losing a zone runs the same sequence over the same protocol:

- No restore, and no backup to replay.
- No judgment call about whether the failure is temporary or permanent.

That is the difference from [Dual-Region](./dual-region.md), where the same event costs the quorum and processing stops until an operator intervenes.

**A window**, because reconfiguration takes time. Most of that window depends on settings outside the engine: client timeouts and retries, traffic routing, database failover, and Camunda's own SQL connection timeouts. This page therefore describes the behavior instead of publishing an RTO figure.

**Data loss depends on which store you mean.** The engine's own state loses nothing. Raft commits a record only once a majority of its replicas hold it. With one replica per zone and three zones, a commit needs two replicas. Losing one zone always leaves at least one replica that has the record.

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

**The window has three parts**, and only the first happens inside the engine:

| What                      | Why it takes time                                                                                                                                                                                                                                                                                                         |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Raft re-election          | Partitions whose leader was in the lost zone have no leader until the cluster detects the failure and elects a new one. They do not process during that window.                                                                                                                                                           |
| Client traffic rerouting  | The gateway in the lost region is unreachable. Clients pointed at it fail until you reroute them, which is your traffic management, not Camunda's.                                                                                                                                                                        |
| Database writer promotion | If the writer was in the lost region, exporting stops until you promote a surviving member. The engine keeps processing. A long enough export backlog trades write rate against backlog once you enable flow control. The APIs and web applications that read secondary storage serve stale data until exporting resumes. |

Skewing partition leadership to the writer's zone makes the first of these worse in one specific case. Losing that zone loses most partition leaders at once, so more partitions re-elect simultaneously. That is the price of avoiding an inter-region round trip on every export flush.

**Client configuration decides whether the re-election and rerouting windows are visible.** A re-election is a window a client retries through, not an outage. That only holds if its timeout and retry budget survives one. A client that gives up on the first refused connection sees the re-election as downtime, in a single-region cluster as much as here.

The window is longer here, because the new leader and the rerouted client can both be a region away. Size client timeouts and retries for a leader change that crosses a region boundary.

## Removing a lost zone

Whether the lost zone has to be removed depends on the replicas it held, not on how many zones there are. A partition keeps its quorum as long as the lost zone held fewer than half its replicas:

- **Under a layout that satisfies this**, such as the default `2-2-1` across three zones, the majority holds. Processing continues whether or not you remove the zone.
- **When one zone holds half the replicas or more**, losing that zone costs the quorum. Processing only resumes once the zone is removed from the partition distribution.

<RemoveZoneImg role="img" title="Two layouts lose their first zone. In 2-2-1, losing london leaves 3 of 5 replicas: the majority holds and removing the zone is optional. In 4-1-1, losing zone A leaves 2 of 6 replicas: there is no majority, and processing resumes only after you remove the zone. Removal is recommended in both cases once the zone is confirmed down, because a removed zone has to be added back and its brokers rebuild." />

An evenly split two-zone cluster always loses its quorum with a zone. That is the [Dual-Region](./dual-region.md) situation, not a normal layout of this architecture. An uneven two-zone layout keeps its quorum only when it loses the smaller zone.

The recommended practice is to remove a lost zone once you confirm it is down. The trade-off is failback cost: a removed zone has to be added back explicitly, and its brokers rebuild from nothing. The [operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#4-remove-the-lost-zone) has the command.
