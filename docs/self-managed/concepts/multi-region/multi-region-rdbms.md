---
id: multi-region-rdbms
title: "Multi-Region RDBMS"
sidebar_label: "Multi-Region RDBMS"
description: "Multi-Region RDBMS spreads an Orchestration Cluster across three or more regions so that a region loss leaves the Raft quorum intact, and delegates secondary storage replication to the database."
---

import PageDescription from '@site/src/components/PageDescription';
import TopologyImg from './img/multi-region-rdbms-topology.svg';
import QuorumImg from './img/multi-region-rdbms-quorum.svg';
import AddZoneImg from './img/multi-region-rdbms-add-zone.svg';
import ActiveStandbyImg from './img/multi-region-rdbms-active-standby.svg';
import RegionLossDiagram from './img/multi-region-rdbms-region-loss.svg';
import RecoveryWindowImg from './img/multi-region-rdbms-recovery-window.svg';

<PageDescription />

Multi-Region RDBMS spreads a single Orchestration Cluster across two or more regions. It uses a relational database as its secondary storage, and leaves replication to that database. You need three or more regions to keep processing through a region loss. Every partition then keeps a majority when one region disappears, as long as no region holds half the replicas of a partition or more. The engine keeps processing instead of stopping for an operator.

:::caution Before you begin
Running a multi-region setup requires you to develop, test, and execute [operational procedures](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md) specific to your environment. Review the [limitations](#limitations) and [requirements](#requirements) before you commit to this configuration.

To have your multi-region setup covered by Camunda enterprise support, get your configuration and runbooks reviewed by Camunda before going to production. Contact your Customer Success Manager as soon as you plan your multi-region setup.

That review covers the architecture you build. It does not make the [reference implementation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md) a supported product. That repository is explicitly experimental. It is meant for learning, evaluation, and design review, and is not production-ready as published.
:::

## How Multi-Region RDBMS differs from Dual-Region

The two multi-region architectures differ in region count and in secondary storage.

[Dual-Region](./dual-region.md) is the two-region architecture with Elasticsearch secondary storage and parity-numbered brokers. It has two properties that come from the region count rather than from any implementation choice.

With two regions, no replica placement survives losing half of them. A region loss therefore costs the Raft quorum, and Zeebe stops processing until an operator force-removes the lost brokers. Each region also owns its own copy of the secondary storage, so a returning region has to be re-seeded. Failback therefore includes a secondary storage snapshot and a cross-region restore.

Multi-Region RDBMS removes both. It changes the number of regions, and it changes who owns replication of the secondary storage.

| Consideration     | Dual-Region                                                                       | Multi-Region RDBMS                                                                           |
| :---------------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Regions           | Exactly two                                                                       | Two or more. Three or more to keep processing through a region loss                          |
| Region loss       | Quorum lost, processing stops until brokers are force-removed                     | Quorum preserved, processing continues                                                       |
| Failback          | Multi-step runbook including a secondary storage snapshot and restore             | Redeploy the region, nothing to restore                                                      |
| Secondary storage | Elasticsearch, one cluster per region, one Camunda exporter per region            | RDBMS, one database, one exporter, replication inside the database                           |
| Optimize          | Supported                                                                         | Not available, Optimize requires Elasticsearch or OpenSearch                                 |
| Relative cost     | **$$$**: two regions of Orchestration Cluster capacity, plus cross-region traffic | **$$$$**: three or more regions of Orchestration Cluster capacity, plus cross-region traffic |

Choose Multi-Region RDBMS when processing must continue through a region loss without operator intervention, and when you can run without Optimize. Choose [Dual-Region](./dual-region.md) when two regions are sufficient, or when you need Optimize on the same cluster.

## Architecture

Three infrastructure layers let one cluster span several regions.

<TopologyImg role="img" title="Three regions each running an Orchestration Cluster, connected by a private inter-region network and a cross-cluster service discovery layer, all writing to a single replicated relational database" />

One Orchestration Cluster spans every region. Each region runs its own brokers and connectors, and all of them are members of the same Zeebe cluster. Three infrastructure layers make that possible:

| Layer                           | Responsibility                                                                          |
| :------------------------------ | :-------------------------------------------------------------------------------------- |
| Inter-region network            | Carries broker-to-broker traffic, including Raft, between regions on private addresses. |
| Cross-cluster service discovery | Publishes each region's Zeebe service under a name every other region can resolve.      |
| Relational secondary storage    | Accepts writes from every region through a single endpoint, and replicates them itself. |

The Camunda layer sees one cluster and one database. Everything region-specific lives in the infrastructure layers, which keeps the architecture portable across deployment platforms.

### Partition placement across zones

Multi-Region RDBMS relies on [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md). Each region is one zone, and every zone declares how many brokers it holds and how many replicas of each partition live in it.

A partition survives while a majority of its **replicas** answer. Zeebe counts replicas, not zones. A zone holds as many replicas as you give it. The replication factor is the sum across the zones rather than the number of zones.

The simplest case is one replica per zone, which is what the following illustration uses. The replication factor then equals the zone count, and a partition keeps its majority while `N - 1 > N / 2`.

<QuorumImg role="img" title="With two zones, losing one leaves one replica of two and no majority, so processing stops. With three zones, losing one leaves two replicas of three, a majority, so processing continues." />

| Zones | Replicas per zone | Replication factor | Zone losses tolerated |
| :---- | :---------------- | :----------------- | :-------------------- |
| 2     | 1                 | 2                  | 0                     |
| 3     | 1                 | 3                  | 1                     |
| 4     | 1                 | 4                  | 1                     |
| 5     | 1                 | 5                  | 2                     |

Three zones is the smallest topology in which losing one does not stop the engine. A fourth zone at one replica each does not change that. The replication factor becomes four, and a majority is still three. A second loss leaves two. Tolerating two losses takes five replicas.

#### Choosing an asymmetric layout

Zones do not have to be equal, and making them equal is rarely what you want. A common shape places more replicas in the regions that also host a database member. It places one replica in a region that exists to break ties:

| Zone | Database member | Replicas | Losing this zone leaves |
| :--- | :-------------- | :------- | :---------------------- |
| A    | yes             | 2        | 3 of 5, majority holds  |
| B    | yes             | 2        | 3 of 5, majority holds  |
| C    | no              | 1        | 4 of 5, majority holds  |

That is `replicationFactor: 5` across three zones. The third region carries a vote without carrying a database, and it is the zone that decides a quorum when the other two disagree.

It is still a full region: the brokers there hold data and process work like any others, and the region serves clients. Only the database member is absent. This is not a lightweight arbiter or a "2.5 region" topology.

The only rule is that **no single zone may hold half the replicas or more**, or losing that zone stops the engine. A `4-1-1` layout across three zones fails it: losing the first leaves two replicas of six.

Zone awareness also assigns a Raft election priority per zone. Give the zone that hosts the database writer the highest priority. Elections then favor leaders next to the writer, which reduces inter-region round trips on export flushes. The priority biases elections but does not pin leaders. Move existing leaders with the coordinated rebalancing API (`POST /cluster/v2/rebalance`), described in [rebalancing](/self-managed/components/orchestration-cluster/zeebe/operations/rebalancing.md).

### Replication-agnostic secondary storage

Camunda uses one JDBC URL per Orchestration Cluster, through a connection pool on each broker, and the RDBMS exporter has no multi-region mode. As the [RDBMS multi-region support](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) documentation states, multi-region replication must be handled within the database itself.

Multi-Region RDBMS adopts that constraint rather than working around it:

- Every broker in every region writes to the **same JDBC URL**.
- There are **no per-region exporters** to enable, disable, or reinitialize.
- Region loss desynchronizes nothing at the Camunda layer, so failback has no restore step.
- Swapping the database changes one value.

Any database that presents a single endpoint following its own writer fits. See [multi-region support](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) for the supported databases. For example:

- A globally replicated managed database.
- A PostgreSQL cluster behind a floating endpoint.
- A connection proxy.
- A DNS record you repoint during failover.

Whichever mechanism you choose, test it with the [failover procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md) before you go to production.

The Camunda configuration does not change between them.

:::warning Replication monitoring is required
Asynchronous replication monitoring is required, not a tuning option. Without it the RDBMS exporter acknowledges records the standby has not received yet, and a writer failover loses exported data. This architecture treats a writer failover as a routine operation rather than an incident, so set `camunda.data.secondary-storage.rdbms.async-replication.enabled` to `true`.

Monitoring is off by default, because `async-replication.enabled` defaults to `false`. Once you enable it, the strategy defaults to `LOG_SEQ`. On a backend without log sequence number support, set `async-replication.type` to `DELAY` explicitly.

| Strategy                   | When to use it                                                                                                                                                                       | What you configure                                                                          |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `LOG_SEQ` (LSN monitoring) | Default and preferred. Reads the database's own replication position. Supported on Aurora Global Database with PostgreSQL, Aurora Global Database with MySQL, MSSQL, and PostgreSQL. | `async-replication.type: LOG_SEQ`                                                           |
| `TIME_LAG`                 | Less precise alternative to `LOG_SEQ`. Reads the replication lag the primary reports, and acknowledges less often. Same backends as `LOG_SEQ`.                                       | `async-replication.type: TIME_LAG`                                                          |
| `DELAY`                    | Backends without LSN support. Works with any backend. Carries no replication signal.                                                                                                 | `async-replication.type: DELAY`, a `delay` value, and your own monitoring of the actual lag |

Camunda doesn't switch strategies for you. See [multi-region support](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) for the supported backends and the settings.
:::

### The database tier is active-standby

The Zeebe data plane is active-active: every region processes. The database tier is not. A single writer serves every region, and brokers that are not co-located with it pay the inter-region round trip on every export flush.

Two consequences follow, and both are sizing decisions rather than configuration:

- Keep regions inside the round-trip time budget described in [network requirements](#network-requirements).
- Size the exporter queue for the latency of the furthest region, not the nearest.

Skewing partition leadership to the writer's zone through zone priority reduces how often that round trip is paid, but it does not remove it.

<ActiveStandbyImg role="img" title="Three regions, london, paris, and zurich, each run Zeebe brokers. Only london hosts the database writer. The london brokers export to it locally, while the paris and zurich brokers export across a region. The writer replicates asynchronously to the database standby in paris. Zurich has no database member." />

## Requirements

The architecture only works under the cluster, network, platform, and upgrade requirements below.

### Zeebe cluster configuration

| Setting                       | Requirement                                                                                                                                  |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Partitioning scheme           | `ZONE_AWARE`. The parity-based broker numbering only supports exactly two regions.                                                           |
| Zones                         | One zone per region, two or more. Three or more to keep processing through a region loss.                                                    |
| `number-of-replicas` per zone | Declared per zone, and free to differ between them. No zone may hold half the replication factor or more.                                    |
| `number-of-brokers` per zone  | Declared per zone. Keep zones balanced so a zone loss removes an equal share of capacity.                                                    |
| Surviving capacity            | Size the cluster so the regions left after a loss carry the full workload. Quorum surviving is not the same as the cluster keeping up.       |
| `priority` per zone           | Highest for the zone hosting the database writer, to keep partition leaders next to it.                                                      |
| `partitionCount`              | Unrestricted. Size it from your workload. See [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md). |

Each broker sets its own zone, while the zone list is identical in every region. For the full property reference, see [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md). For the matching Helm keys, see [multi-region zone awareness](/self-managed/deployment/helm/configure/multi-region-zone-awareness.md).

### Network requirements

- Kubernetes clusters, services, and pods must use distinct, non-overlapping CIDRs across every region.
- Every region must reach every other region. Zeebe uses a full mesh, not a hub and spoke, so partial connectivity leaves partitions unable to form a quorum.
- Every other cluster must resolve and reach the Kubernetes services in one cluster. The name must be the same from each region's point of view.
- Round-trip time between regions directly affects Raft commit latency and throughput. As a guideline, keep it at or below **100 ms**. Higher latencies degrade performance, but are not a hard limit enforced by the engine.
- Required open ports between regions:
  - **26500**: Zeebe gateway, client and worker communication
  - **26501** and **26502**: Zeebe broker and gateway communication, including Raft
  - **8080**: Orchestration Cluster REST API
  - **53**: DNS, for cross-cluster service resolution

These are the default ports. Change them if you customize them in your configuration.

A private inter-region network is preferred for the database, but it is not required. A public path also works, and it adds egress cost and exposure. You must measure the latency between the regions, and the inter-region connectivity must stay stable.

### Infrastructure and deployment platform considerations

Multi-region setups require careful planning. You must manage the following areas independently, and Camunda does not control or document them:

- **Kubernetes cluster management**: managing three or more Kubernetes clusters and their deployments
- **Monitoring and alerting**: multi-region monitoring with cross-region correlation
- **Cost implications**: three or more clusters and cross-region traffic increase costs, and inter-region data transfer is billed per gigabyte
- **Network reliability**: increased latency affects Raft commit latency and export throughput. Even short latency bursts have an impact.
- **Traffic management**: DNS and incoming traffic routing across more than two regions
- **Database operations**: replication, failover, and backup of the secondary storage are the database's responsibility, and therefore yours
- **Security**: consistent security policies and network controls across every region

### Upgrade considerations

{/* TODO: multi-region upgrade paths are not tested yet. Document them once https://github.com/camunda/team-infrastructure-experience/issues/1270 is done. */}

Upgrade **one region at a time**, so the other regions keep the quorum. The [operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#upgrade-the-cluster) lists the steps.

## Growing the cluster

You can add capacity to a running cluster.

Zone awareness names zones instead of numbering brokers, so a zone can be added to a running cluster without renumbering it.

<AddZoneImg role="img" title="Three stages of the same cluster. First, two zones, london and paris, with two replicas each and replication factor four; the zurich slot is provisioned but not declared, and losing either zone leaves two of four replicas, so processing stops. Second, the zurich brokers are deployed and the zone is added with POST /actuator/cluster/zones/zurich, one replica and priority 800, then the operator waits for COMPLETED. Third, three zones in a 2-2-1 layout at replication factor five, where losing a database zone leaves three of five replicas and processing continues. No broker is renumbered and the running regions are not restarted." />

### Declare only the zones you deploy

A zone in the zone list receives partition replicas whether or not its brokers run. A declared zone without brokers leaves every partition one zone short. With the default `2-2-1` layout and the third zone missing, each partition runs four replicas of five, and losing either database zone stops processing.

### Add a zone to the running cluster

1. Start the brokers of the new zone.
1. Add the zone with the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md).
1. Wait for the change to report `COMPLETED`.

The engine places the zone's replicas and raises the replication factor in one change. No broker is renumbered, and the regions already running are not restarted.

| Zones running | Layout  | Replication factor | After losing one zone                          |
| :------------ | :------ | :----------------- | :--------------------------------------------- |
| Two           | `2-2`   | 4                  | 2 of 4 replicas: processing stops              |
| Three         | `2-2-1` | 5                  | 3 of 5 replicas at worst: processing continues |

### Size the partition count up front

The partition count is fixed at bootstrap, so size it for the largest topology you expect. The reference implementation sizes it on the provisioned region slots, not on the zones running at bootstrap.

## Region failure and recovery

A region loss is the unplanned change. This section describes what the cluster does when a region disappears.

<RegionLossDiagram role="img" title="Losing london in a 2-2-1 layout. London held two replicas and the database writer. Paris, with two replicas and the standby, and zurich, with one replica and no database, keep three of five replicas, so the quorum holds." />

Losing one region out of three or more removes that region's replicas of every partition. Under the default `2-2-1` layout, that is one or two replicas. The remaining replicas still form a majority if every declared zone runs and no zone holds half the replicas or more. The cluster then keeps its quorum. **You need no operator step to resume processing.** Partitions whose leader was in the lost region pause for a Raft re-election and then continue. Partitions led elsewhere continue without interruption.

Two things still need attention.

**The database writer.** If the writer was in the lost region, promote a surviving member. A planned switchover loses no data. An unplanned promotion loses whatever had not replicated at the time of the outage, bounded by the replication lag your [asynchronous replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) strategy allows. Camunda itself needs no reconfiguration as long as the JDBC URL keeps resolving to the current writer.

**Client traffic.** Camunda clients take one REST address and one gRPC address, not a list of endpoints. Point them at one address that fails over. For example, use a DNS record with health checks and failover routing, or a global load balancer in front of the regional load balancers. Most providers offer both, for example Amazon Route 53 and AWS Global Accelerator, Azure Traffic Manager and Azure Front Door, or Google Cloud DNS routing policies and Cloud Load Balancing.

Recovery is the reverse and has no restore step. Redeploy the region. Its brokers replay from the surviving replicas exactly as they would after a node restart. For the step-by-step procedure, see [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md).

### Recovery objectives {#recovery-objectives}

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

`pause-on-max-lag-exceeded` decides what happens once the lag passes the configured threshold. It is off by default, and it caps neither data loss nor retained log growth. Acknowledgement waits for confirmed replication either way, so the unacknowledged position holds the log either way. With it off, exporting continues against a database that is already behind. With it on, exporting stops, so secondary storage receives nothing new and the APIs reading it fall behind the engine until replication recovers. Enable it deliberately, once you have alerting on replication lag.

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

### Removing a lost zone

Whether the lost zone has to be removed depends on the replicas it held, not on how many zones there are. A partition keeps its quorum as long as the lost zone held fewer than half its replicas:

- **Under a layout that satisfies this**, such as the default `2-2-1` across three zones, the majority holds. Processing continues whether or not you remove the zone.
- **When one zone holds half the replicas or more**, losing that zone costs the quorum. Processing only resumes once the zone is removed from the partition distribution.

An evenly split two-zone cluster always loses its quorum with a zone. That is the [Dual-Region](./dual-region.md) situation, not a normal layout of this architecture. An uneven two-zone layout keeps its quorum only when it loses the smaller zone.

The recommended practice is to remove a lost zone once you confirm it is down. The trade-off is failback cost: a removed zone has to be added back explicitly, and its brokers rebuild from nothing. The [operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#4-remove-the-lost-zone) has the command.

## Limitations

Recovery behaves as described only inside the boundaries this architecture sets. The following table lists them.

| Aspect                      | Details                                                                                                                                                                                       |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods        | Kubernetes with the [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md). Alternative installation methods are not covered by these guides.                           |
| Secondary storage           | RDBMS only. Elasticsearch and OpenSearch replicate per region and do not fit the single-endpoint model this architecture depends on.                                                          |
| Database availability       | The database tier is active-standby. A single writer serves every region, and regions further from it pay more export latency.                                                                |
| Management Identity support | Management Identity is not available in this setup. The Orchestration Cluster-level Admin supports multi-tenancy and role-based access control instead.                                       |
| Optimize support            | Not available. Optimize requires Elasticsearch or OpenSearch, regardless of the region count.                                                                                                 |
| Camunda Hub                 | Hub is a standalone component not covered in this guide. Modeling applications can operate independently outside of the Orchestration Clusters. Hub also depends on Management Identity.      |
| Connectors deployment       | Connectors run in every region and are not deduplicated. Account for [idempotency](/components/connectors/use-connectors/inbound.md#creating-the-connector-event) to avoid event duplication. |
| Zone list changes           | Adding a zone is online, through the cluster management API: the engine places the new zone's replicas without renumbering brokers. The partition count stays fixed at its bootstrap value.   |
| Backup and restore          | RDBMS backup relies on continuous primary storage backups plus a database-native backup. See [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).     |

## Reference implementation

Camunda publishes one implementation of this architecture, on Amazon Web Services:

- [Multi-region setup with RDBMS on Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md) deploys three EKS clusters connected by AWS Transit Gateway. It uses Submariner for cross-cluster service discovery and Aurora Global Database as secondary storage.
- [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md) covers region loss, failback, and adding a zone.

The architecture is not AWS-specific. Each of its three layers has an equivalent on other platforms. For example, Red Hat OpenShift provides Submariner through Advanced Cluster Management, as the [OpenShift dual-region setup](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md) already uses.

## Related resources

These pages cover the concepts and settings this page refers to.

- [Multi-region resilience](./resilience-tiers.md): compare all multi-region strategies.
- [Dual-Region](./dual-region.md): the two-region configuration with Elasticsearch secondary storage.
- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): how zones, replicas, and priorities are configured.
- [Relational database configuration](/self-managed/concepts/databases/relational-db/configuration.md): RDBMS secondary storage settings, including asynchronous replication monitoring.
- [Zeebe clustering](/components/zeebe/technical-concepts/clustering.md): how Raft replication and quorum work.
