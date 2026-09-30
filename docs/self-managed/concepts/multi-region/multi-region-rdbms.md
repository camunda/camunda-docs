---
id: multi-region-rdbms
title: "Multi-Region RDBMS"
sidebar_label: "Multi-Region RDBMS"
description: "Multi-Region RDBMS spreads an Orchestration Cluster across three or more regions so that a region loss leaves the Raft quorum intact, and delegates secondary storage replication to the database."
---

import PageDescription from '@site/src/components/PageDescription';
import TopologyImg from './img/multi-region-rdbms-topology.svg';
import QuorumImg from './img/multi-region-rdbms-quorum.svg';
import ActiveStandbyImg from './img/multi-region-rdbms-active-standby.svg';

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

Camunda turns this monitoring off by default. The default suits a single database without asynchronous replicas, and the monitoring needs extra database privileges, for example the `PG_MONITOR` role on PostgreSQL. This architecture needs it, so the reference implementation sets it to `true`. Once you turn it on, the strategy defaults to `LOG_SEQ`.

The strategy you can use depends on the database engine, not on the cloud provider. Use `LOG_SEQ` when your database is in its [vendor support list](/self-managed/concepts/databases/relational-db/configuration.md#lsn-replication-monitoring). Otherwise, choose `TIME_LAG` or `DELAY`. The reference implementation covers only Aurora Global Database. Managed databases on other providers, such as Azure or Google Cloud, follow the same rules but have no reference implementation.

{/* TODO: replace this paragraph with a link to a per-database table of the preferred multi-region replication settings once that reference exists. */}

| Strategy                   | When to use it                                                                                                                                                                       | What you configure                                                                          |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `LOG_SEQ` (LSN monitoring) | Default and preferred. Reads the database's own replication position. Supported on Aurora Global Database with PostgreSQL, Aurora Global Database with MySQL, MSSQL, and PostgreSQL. | `async-replication.type: LOG_SEQ`                                                           |
| `TIME_LAG`                 | Less precise than `LOG_SEQ`. Reads the replication lag the primary reports, and acknowledges less often. Supported on the same databases as `LOG_SEQ`.                               | `async-replication.type: TIME_LAG`                                                          |
| `DELAY`                    | Fallback for a database that supports neither `LOG_SEQ` nor `TIME_LAG`, for example Azure SQL Database. Carries no replication signal.                                               | `async-replication.type: DELAY`, a `delay` value, and your own monitoring of the actual lag |

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

{/* TODO: multi-region upgrade paths are not tested yet. Document them once they are. */}

Upgrade **one region at a time**, so the other regions keep the quorum. The [operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#upgrade-the-cluster) lists the steps.

## Growth and region loss

Two companion pages describe how the cluster changes over its life:

- [Grow a Multi-Region RDBMS cluster](./multi-region-rdbms-growth.md): add a region to a running cluster through the cluster management API.
- [Region loss and recovery in Multi-Region RDBMS](./multi-region-rdbms-region-loss.md): what the cluster does when a region disappears, the recovery window, and when to remove a lost zone.

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
- [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md) covers region loss, failback, and adding a region.

The architecture is not AWS-specific. Each of its three layers has an equivalent on other platforms. For example, Red Hat OpenShift provides Submariner through Advanced Cluster Management, as the [OpenShift dual-region setup](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md) already uses.

## Related resources

These pages cover the concepts and settings this page refers to.

- [Multi-region resilience](./resilience-tiers.md): compare all multi-region strategies.
- [Dual-Region](./dual-region.md): the two-region configuration with Elasticsearch secondary storage.
- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): how zones, replicas, and priorities are configured.
- [Relational database configuration](/self-managed/concepts/databases/relational-db/configuration.md): RDBMS secondary storage settings, including asynchronous replication monitoring.
- [Zeebe clustering](/components/zeebe/technical-concepts/clustering.md): how Raft replication and quorum work.
