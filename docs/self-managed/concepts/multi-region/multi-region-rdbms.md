---
id: multi-region-rdbms
title: "Multi-Region RDBMS"
sidebar_label: "Multi-Region RDBMS"
description: "Multi-Region RDBMS spreads an Orchestration Cluster across three or more regions so a region loss never costs the Raft quorum, and delegates secondary storage replication to the database."
---

import PageDescription from '@site/src/components/PageDescription';
import TopologyImg from './img/multi-region-rdbms-topology.svg';
import QuorumImg from './img/multi-region-rdbms-quorum.svg';
import ZoneActivationImg from './img/multi-region-rdbms-zone-activation.svg';

<!-- Diagrams: edit the .excalidraw source, then export SVG and strip the embedded font block,
     replace font-family with a monospace stack, and remove the root width/height so the SVG
     scales to the content column. A vanilla excalidraw.app export does none of these. -->

<PageDescription />

Multi-Region RDBMS spreads a single Orchestration Cluster across three or more regions and backs it with one relational secondary storage whose replication is the database's responsibility. Because every partition keeps a majority of its replicas when one region disappears, the engine keeps processing through a region loss instead of stopping for an operator.

:::caution Before you begin
Running a multi-region setup requires you to develop, test, and execute [operational procedures](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md) specific to your environment. Review the [limitations](#limitations) and [requirements](#requirements) before you commit to this configuration.

To have your multi-region setup covered by Camunda enterprise support, get your configuration and runbooks reviewed by Camunda before going to production. Contact your Customer Success Manager as soon as you start planning.
:::

## How Multi-Region RDBMS differs from Dual-Region

[Dual-Region](./dual-region.md) has two properties that come from the region count rather than from any implementation choice.

With two regions there is no replica placement that survives losing half of them, so a region loss costs the Raft quorum and Zeebe stops processing until an operator force-removes the lost brokers. And because each region owns its own copy of the secondary storage, a returning region has to be re-seeded, which is why failback includes a secondary storage snapshot and a cross-region restore.

Multi-Region RDBMS removes both by changing two things: the number of regions, and who owns replication of the secondary storage.

| Consideration     | Dual-Region                                                                       | Multi-Region RDBMS                                                                           |
| :---------------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Regions           | Exactly two                                                                       | Three or more                                                                                |
| Region loss       | Quorum lost, processing stops until brokers are force-removed                     | Quorum preserved, processing continues                                                       |
| Failback          | Multi-step runbook including a secondary storage snapshot and restore             | Redeploy the region, nothing to restore                                                      |
| Secondary storage | Elasticsearch, one cluster per region, one Camunda exporter per region            | RDBMS, one database, one exporter, replication inside the database                           |
| Optimize          | Supported                                                                         | Not available, Optimize requires Elasticsearch or OpenSearch                                 |
| Relative cost     | **$$$**: two regions of Orchestration Cluster capacity, plus cross-region traffic | **$$$$**: three or more regions of Orchestration Cluster capacity, plus cross-region traffic |

Choose Multi-Region RDBMS when processing must continue through a region loss without operator intervention, and when you can run without Optimize. Choose [Dual-Region](./dual-region.md) when two regions are sufficient, or when you need Optimize on the same cluster.

## Architecture

<TopologyImg role="img" title="Three regions each running an Orchestration Cluster, connected by a private inter-region network and a cross-cluster service discovery layer, all writing to a single replicated relational database" />

One Orchestration Cluster spans every region. Each region runs its own brokers and connectors, and all of them are members of the same Zeebe cluster. Three infrastructure layers make that possible:

| Layer                           | Responsibility                                                                          |
| :------------------------------ | :-------------------------------------------------------------------------------------- |
| Inter-region network            | Carries broker-to-broker traffic, including Raft, between regions on private addresses. |
| Cross-cluster service discovery | Publishes each region's Zeebe service under a name every other region can resolve.      |
| Relational secondary storage    | Accepts writes from every region through a single endpoint, and replicates them itself. |

The Camunda layer sees one cluster and one database. Everything region-specific lives in the infrastructure layers, which is what keeps the architecture portable across deployment platforms.

### Partition placement across zones

Multi-Region RDBMS relies on [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md). Each region is one zone, and every zone declares how many brokers it holds and how many replicas of each partition live in it.

Give each zone `number-of-replicas: 1` and the replication factor equals the zone count, so every zone holds exactly one replica of every partition. Losing a zone then costs one replica out of N, and a partition keeps its majority while `N - 1 > N / 2`.

<QuorumImg role="img" title="With two zones, losing one leaves one replica of two and no majority, so processing stops. With three zones, losing one leaves two replicas of three, a majority, so processing continues." />

| Zones | Replication factor | Zone losses tolerated |
| :---- | :----------------- | :-------------------- |
| 2     | 2                  | 0                     |
| 3     | 3                  | 1                     |
| 4     | 4                  | 1                     |
| 5     | 5                  | 2                     |

Three zones is the smallest topology in which losing one does not stop the engine. A fourth zone does not raise the tolerance, but it does give you a zone to lose while another is already down for maintenance.

Zone awareness also assigns a Raft election priority per zone. Give the zone that hosts the database writer the highest priority so partition leaders stay next to it, which avoids an inter-region round trip on every export flush.

### Replication-agnostic secondary storage

Camunda exposes one JDBC connection per Orchestration Cluster, and the RDBMS exporter has no multi-region mode. As the [RDBMS multi-region support](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) documentation states, multi-region replication must be handled within the database itself.

Multi-Region RDBMS adopts that constraint rather than working around it:

- Every broker in every region writes to the **same JDBC URL**.
- There are **no per-region exporters** to enable, disable, or reinitialize.
- Region loss desynchronizes nothing at the Camunda layer, so failback has no restore step.
- Swapping the database changes one value.

Any database that presents a single endpoint following its own writer fits: a globally replicated managed database, a PostgreSQL cluster behind a floating endpoint, a connection proxy, or a DNS record you repoint during failover. The Camunda configuration does not change between them.

:::warning
Asynchronous replication monitoring is required, not a tuning option. Without it the RDBMS exporter acknowledges records the standby has not received yet, and a writer failover loses exported data. This architecture treats a writer failover as a routine operation rather than an incident, so set `camunda.data.secondary-storage.rdbms.async-replication.enabled` to `true` and choose a strategy in [multi-region support](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support).
:::

### The database tier is active-standby

The Zeebe data plane is active-active: every region processes. The database tier is not. A single writer serves every region, and brokers that are not co-located with it pay the inter-region round trip on every export flush.

Two consequences follow, and both are sizing decisions rather than configuration:

- Keep regions inside the round-trip time budget described in [network requirements](#network-requirements).
- Size the exporter queue for the latency of the furthest region, not the nearest.

Skewing partition leadership to the writer's zone through zone priority reduces how often that round trip is paid, but it does not remove it.

## Requirements

### Zeebe cluster configuration

| Setting                       | Requirement                                                                                                                                  |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Partitioning scheme           | `ZONE_AWARE`. The parity-based broker numbering only supports exactly two regions.                                                           |
| Zones                         | One zone per region, three or more.                                                                                                          |
| `number-of-replicas` per zone | `1`, so the replication factor equals the zone count and every zone holds one replica of each partition.                                     |
| `number-of-brokers` per zone  | Declared per zone. Keep zones balanced so a zone loss removes an equal share of capacity.                                                    |
| `priority` per zone           | Highest for the zone hosting the database writer, to keep partition leaders next to it.                                                      |
| `partitionCount`              | Unrestricted. Size it from your workload. See [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md). |

Each broker sets its own zone, while the zone list is identical in every region. For the full property reference, see [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md).

### Network requirements

- Kubernetes clusters, services, and pods must use distinct, non-overlapping CIDRs across every region.
- Every region must reach every other region. Zeebe uses a full mesh, not a hub and spoke, so partial connectivity leaves partitions unable to form a quorum.
- Kubernetes services in one cluster must be resolvable and reachable from every other cluster, under a name that is the same from each region's point of view.
- Round-trip time between regions directly affects Raft commit latency and throughput. As a guideline, keep it at or below **100 ms**. Higher latencies degrade performance, but are not a hard limit enforced by the engine.
- Required open ports between regions:
  - **26500**: Zeebe gateway, client and worker communication
  - **26501** and **26502**: Zeebe broker and gateway communication, including Raft
  - **8080**: Orchestration Cluster REST API
  - **9600**: Orchestration Cluster management API
  - **53**: DNS, for cross-cluster service resolution

The database is reached over the same private inter-region network. It does not need to be exposed publicly.

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

Upgrade **one region at a time**, and wait for the cluster to report healthy before starting the next. Upgrading several regions simultaneously risks quorum loss.

Follow the upgrade recommendations in the [Camunda Helm chart](/self-managed/upgrade/helm/index.md), review the [upgrade overview](/self-managed/upgrade/index.md), and create a [backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md) first.

## Growing the cluster

Zone awareness names zones instead of numbering brokers, so the zone list can change without renumbering the cluster. That makes one growth path online and another one a migration.

<ZoneActivationImg role="img" title="Two states of the same cluster. On the left, three zones are declared and two deployed: the third zone's replica is reserved, every partition runs at two of three replicas, a majority, and the cluster runs. On the right, the third zone has been activated and every partition holds three of three replicas. No broker is renumbered and no partition is redistributed between the two states." />

**Activating a declared zone is online.** List every zone the cluster will ever have from the start, and deploy fewer of them. The partition layout reserves the missing zone's replicas, so each partition runs at `N - 1` of `N`, still a majority, and the cluster forms and serves normally. Deploying that zone later only fills in replicas that were already reserved: no broker is renumbered, no partition is redistributed, and the running regions are untouched.

Leaving **one** zone undeployed is always safe from three zones upward, because `N - 1` of `N` is a majority for every `N >= 3`. Leaving more is only safe in larger topologies, and the reference implementation does not allow it: it rejects anything beyond a single undeployed zone at plan time, so the growth path stays the same whatever the zone count.

**Adding a zone that was never declared** changes the zone list in every region and redistributes partitions. Plan the largest topology you expect up front and grow into it.

## Region failure and recovery

Losing one region out of three or more removes one replica of every partition. The remaining replicas still form a majority, so the cluster keeps its quorum and **no operator step is required to resume processing**, which is the property this architecture exists for. Partitions whose leader was in the lost region pause for a Raft re-election and then continue; partitions led elsewhere are unaffected.

Two things still need attention.

**The database writer.** If the writer was in the lost region, promote a surviving member. A planned switchover loses no data. An unplanned promotion loses whatever had not replicated at the time of the outage, bounded by the replication lag your [asynchronous replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) strategy allows. Camunda itself needs no reconfiguration as long as the JDBC URL keeps resolving to the current writer.

**Client traffic.** Route clients away from the lost region.

Recovery is the reverse and has no restore step: redeploy the region, and its brokers replay from the surviving replicas exactly as they would after a node restart. For the step-by-step procedure, see [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md).

### Recovery objectives {#recovery-objectives}

Neither objective is zero, and neither is a property of the architecture alone.

**Data loss depends on which store you mean.** The engine's own state loses nothing: Raft commits a record only once a majority of its replicas hold it, so with one replica per zone and three zones a commit needs two, and losing one zone always leaves at least one replica that has the record.

Secondary storage is different, because the database replicates asynchronously. An unplanned promotion loses whatever had not reached the standby. What brings that back to zero is not the database but Camunda: with [asynchronous replication monitoring](/self-managed/concepts/databases/relational-db/configuration.md#multi-region-support) enabled, Zeebe holds back log compaction until the database acknowledges, so the lost records are replayed from the Zeebe log. That guarantee costs disk, because the retained log segments grow with the replication lag. Size the disk for it and monitor it.

**Recovery time is not zero either**, even though no operator step is needed to resume processing. Three things take time:

| What                      | Why it takes time                                                                                                                                                                                                         |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Raft re-election          | Partitions whose leader was in the lost zone have no leader until the cluster detects the failure and elects a new one. They do not process during that window.                                                           |
| Client traffic rerouting  | The gateway in the lost region is unreachable. Clients pointed at it fail until you reroute them, which is your traffic management, not Camunda's.                                                                        |
| Database writer promotion | If the writer was in the lost region, exporting stops until a surviving member is promoted. The engine keeps processing, but the APIs and web applications that read secondary storage serve stale data until it resumes. |

Skewing partition leadership to the writer's zone makes the first of these worse in one specific case: losing that zone loses most partition leaders at once, so more partitions re-elect simultaneously. That is the price of avoiding an inter-region round trip on every export flush, and it is worth knowing which zone you made expensive to lose.

### Removing a lost zone

With two zones, a zone loss leaves no majority, and processing only resumes once the lost zone is removed from the partition distribution. With three or more, the majority holds and removing the zone is optional. It is usually not worth it for a zone you expect back, because brokers that stayed members rejoin and catch up from the Raft log, while a removed zone has to be added back explicitly and its brokers start from nothing.

The [operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md#4-decide-whether-to-remove-the-zone) has the decision table and the command.

## Limitations

| Aspect                      | Details                                                                                                                                                                                       |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods        | Kubernetes with the [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md). Alternative installation methods are not covered by these guides.                           |
| Secondary storage           | RDBMS only. Elasticsearch and OpenSearch replicate per region and do not fit the single-endpoint model this architecture depends on.                                                          |
| Database availability       | The database tier is active-standby. A single writer serves every region, and regions further from it pay more export latency.                                                                |
| Management Identity support | Management Identity is not available in this setup. The Orchestration Cluster-level Admin supports multi-tenancy and role-based access control instead.                                       |
| Optimize support            | Not available. Optimize requires Elasticsearch or OpenSearch, regardless of the region count.                                                                                                 |
| Web Modeler                 | Web Modeler is a standalone component not covered in this guide, and it depends on Management Identity. Modeling applications can operate independently outside the Orchestration Cluster.    |
| Connectors deployment       | Connectors run in every region and are not deduplicated. Account for [idempotency](/components/connectors/use-connectors/inbound.md#creating-the-connector-event) to avoid event duplication. |
| Zone list changes           | Activating a zone declared up front is online. Adding a zone that was never declared redistributes partitions across every region.                                                            |
| Backup and restore          | RDBMS backup relies on continuous primary storage backups plus a database-native backup. See [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).     |

## Reference implementation

Camunda publishes one implementation of this architecture, on Amazon Web Services:

- [Multi-region setup with RDBMS on Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md) deploys three EKS clusters connected by AWS Transit Gateway, with Submariner for cross-cluster service discovery and Aurora Global Database as secondary storage.
- [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md) covers region loss, failback, and activating a declared zone.

The architecture is not AWS-specific. Each of its three layers has an equivalent on other platforms. For example, Red Hat OpenShift provides Submariner through Advanced Cluster Management, as the [OpenShift dual-region setup](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md) already uses.

## Related resources

- [Multi-region resilience](./resilience-tiers.md): compare all multi-region strategies.
- [Dual-Region](./dual-region.md): the two-region configuration with Elasticsearch secondary storage.
- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): how zones, replicas, and priorities are configured.
- [Relational database configuration](/self-managed/concepts/databases/relational-db/configuration.md): RDBMS secondary storage settings, including asynchronous replication monitoring.
- [Zeebe clustering](/components/zeebe/technical-concepts/clustering.md): how Raft replication and quorum work.
