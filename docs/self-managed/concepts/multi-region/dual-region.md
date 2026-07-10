---
id: dual-region
title: "Dual-Region"
sidebar_label: "Dual-Region"
description: "Dual-Region is Camunda's production-proven dual-region configuration with continuous replication."
---

import PageDescription from '@site/src/components/PageDescription';
import DualRegionImg from './img/multi-region-dual-region.png';

<PageDescription />

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

Dual-Region is Camunda's certified, continuous-replication multi-region configuration. A Camunda Orchestration Cluster runs in both a primary and a secondary region at all times, with Zeebe replicating its log stream across both regions using the Raft protocol. Secondary storage (Elasticsearch) is populated independently in each region via the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md). It includes published RTO/RPO targets, a reference architecture, and a documented failover runbook.

:::caution Before you begin
Before implementing a dual-region setup, review the [limitations](#limitations) and [infrastructure considerations](#infrastructure-and-deployment-platform-considerations) for this configuration.
:::

| Consideration                       | Value                                                         |
| :---------------------------------- | :------------------------------------------------------------ |
| **Recovery time (RTO)**             | ~15 minutes (see [Recovery objectives](#recovery-objectives)) |
| **Data loss (RPO)**                 | 0                                                             |
| **Failover mode**                   | Manual, operator-initiated                                    |
| **Standing second region required** | Yes. Full Orchestration Cluster running in both regions       |

## Architecture

The dual-region setup uses two Kubernetes clusters, each running a complete set of Camunda 8 components.

<img src={DualRegionImg} alt="Camunda dual-region architecture" title="Camunda dual-region architecture" class="img-noborder img-900"/>

- With v2 APIs (default in 8.9+), both regions serve user traffic simultaneously.
- With v1 APIs, **Region 0** is the primary region serving user traffic; **Region 1** is operational but doesn't serve user traffic under normal conditions.

:::note
The diagram shows both regions as operational. Any grayed-out appearance represents user traffic routing, not system operational status. All components in both regions must be running.
:::

|                                     Component | Mode                                                    | Both regions running | User traffic                              | RPO |
| --------------------------------------------: | :------------------------------------------------------ | :------------------- | :---------------------------------------- | :-- |
| <p align="left">**Orchestration Cluster**</p> |                                                         | ✅ Required          |                                           |     |
|                                         Zeebe | Active-active                                           | ✅ Required          | Both regions process data                 | 0   |
|                                         Admin | Active-active                                           | ✅ Required          | Cluster-level identity                    | 0   |
|                                       Operate | Active-active with v2 API (active-passive with v1)      | ✅ Required          | Both regions serve users with v2 API      | 0   |
|                                      Tasklist | Active-active with Tasklist V2 (active-passive with v1) | ✅ Required          | Both regions serve users with Tasklist V2 | 0   |
|         <p align="left">**Elasticsearch**</p> | Active-active                                           | ✅ Required          | Data replicated to both                   | 0   |

In a dual-region setup, each Orchestration Cluster component operates as follows:

- **Orchestration cluster** runs across both regions using the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), distributing partition leaders and followers for continuous replication.
- **Camunda exporters** push identical data to the Elasticsearch instance in each region. Camunda orchestration cluster dual export mechanism (not Elasticsearch replication) maintains data consistency. The two Elasticsearch clusters don't communicate directly with each other.
- **Operate and Tasklist** maintain synchronized data state across both regions via the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md). See [Active-active and active-passive modes](#active-active-and-active-passive-modes).
- **Admin** is embedded in the Orchestration Cluster and provides cluster-level identity management.

### Component requirements

|                                     Component | Mode                                                    | Requirement                           | Function                                                                                                                                                                                                                                                                                                         | Data loss risk                                                                                                                                                                                                                       |
| --------------------------------------------: | :------------------------------------------------------ | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="left">**Orchestration Cluster**</p> |                                                         |                                       |                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                      |
|                                         Zeebe | Active-active                                           | All brokers in both regions must run  | <ul><li>Leaders and followers distributed across regions</li><li>Continuous replication via Raft protocol</li><li>Both regions required for quorum maintenance</li></ul>                                                                                                                                         | Can handle region failure without data loss when properly configured                                                                                                                                                                 |
|                                         Admin | Active-active                                           | Embedded in the Orchestration Cluster | <ul><li>Provides unified, cluster-level identity management and authorization</li></ul>                                                                                                                                                                                                                          | Can handle region failure without data loss                                                                                                                                                                                          |
|                                       Operate | Active-active with v2 API (active-passive with v1)      | Embedded in the Orchestration Cluster | <ul><li>Both regions maintain synchronized data state</li><li>Both regions serve users when using v2 API</li><li>**Region-specific data**: Uncompleted batch operations only when using v1 API</li></ul>                                                                                                         | Data loss possible only when using v1 API, as changes are isolated to the initiated region                                                                                                                                           |
|                                      Tasklist | Active-active with Tasklist V2 (active-passive with v1) | Embedded in the Orchestration Cluster | <ul><li>Both regions maintain synchronized data state</li><li>Both regions serve users when using Tasklist V2</li><li>**Region-specific data**: Task assignments only when using v1 API</li></ul>                                                                                                                | Data loss possible only when using v1 API, as changes are isolated to the initiated region                                                                                                                                           |
|         <p align="left">**Elasticsearch**</p> | Active-active                                           | Both clusters must run                | <ul><li>Independent clusters in each region</li><li>The Camunda Exporter writes identical data to both continuously and directly</li><li>The Camunda Exporter's dual-write mechanism (not Elasticsearch replication) maintains data consistency</li><li>The clusters don't communicate with each other</li></ul> | If the secondary Elasticsearch cluster is unreachable, the Camunda Exporter position stalls and [flow control](/self-managed/operational-guides/configure-flow-control/) applies backpressure, throttling user commands cluster-wide |

## Active-active and active-passive modes {#active-active-and-active-passive-modes}

Starting in Camunda 8.9, **active-active** is the default user traffic routing for dual-region deployments:

- **Active-active**: Both regions serve user traffic simultaneously. All writes flow through the Camunda Exporter, which maintains data consistency regardless of which region handles the request. This is the default with v2 REST API and Tasklist V2 (8.9+).
- **Active-passive**: One region handles all user traffic; the other is operational but doesn't serve user requests. Required for deployments using v1 APIs, because v1 stores some state locally per region (batch operations, task assignments).

In both modes, both regions participate in data processing and replication at all times. "Passive" refers only to the user traffic layer.

:::info Active-active <a id="active-active"></a>

Starting in Camunda 8.8, the **v2 REST API** removed previous region-specific limitations. In current releases, Tasklist also uses only the Orchestration Cluster REST API, so user task operations are no longer tied to the legacy Tasklist V1 behavior. These improvements make a user-facing **active-active** setup possible. Starting with version 8.9, **active-active** routing is the default for dual-region deployments.

:::

## Traffic routing

### Primary and secondary regions

In v2 API deployments (default in 8.9+), both regions serve user traffic simultaneously and there's no primary/secondary distinction at the UI layer. See [Active-active and active-passive modes](#active-active-and-active-passive-modes).

In v1 API deployments, one region is designated as primary and the other as secondary:

- **Primary region**: Serves user traffic (UI access, API calls).
- **Secondary region**: Operational but doesn't serve user traffic under normal conditions.

In both cases, both regions are operationally active with all components running and replicating data.

### Managing user traffic

With v2 APIs (default in 8.9+), distribute traffic across both regions using DNS, a load balancer, or network routing policies.

With v1 APIs, route all user traffic exclusively to the primary region. You're responsible for configuring and maintaining:

- DNS routing to the primary region
- Load balancer rules and health checks
- Traffic redirection to the secondary region during primary region failure, as part of the complete failover procedure

:::warning
Redirecting traffic without following the full [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) can cause system inconsistencies and data issues.
:::

## Requirements

:::caution
Running dual-region setups requires you to develop, test, and execute custom [operational procedures](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) specific to your environment.
:::

### Installation requirements

To install with the Helm chart, you need two Kubernetes clusters.

:::note Database support
Dual-region configurations don't support OpenSearch or RDBMS (relational database) secondary storage.
:::

#### Network requirements

- Kubernetes clusters, services, and pods must use distinct, non-overlapping CIDRs to avoid routing issues.
- Both regions must be able to communicate with each other (for example, via VPC peering). See the [example AWS EKS implementation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md).
  - Kubernetes services in one cluster must be resolvable and reachable from the other cluster and vice-versa:
    - For AWS EKS, configure DNS chaining. See the [Amazon EKS setup guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md).
    - For OpenShift, use [Submariner](https://docs.redhat.com/en/documentation/red_hat_advanced_cluster_management_for_kubernetes/2.11/html/networking/networking#submariner) for multi-cluster networking. See the [OpenShift dual-region setup guide](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md).
- Network round-trip time (**RTT**) between regions directly affects Raft commit latency and throughput. As a guideline, keep RTT at or below **100 ms**. Higher latencies degrade performance, but are not a hard limit enforced by the engine.
- Required open ports between regions:
  - **9200**: Elasticsearch (cross-region data pushed by Zeebe)
  - **26500**: Zeebe Gateway (client/worker communication)
  - **26501** and **26502**: Zeebe broker and Zeebe Gateway communication

### Zeebe cluster configuration

Zeebe supports the following broker and replication configurations for dual-region setups:

- `clusterSize` must be a multiple of **2** and at least **4** to distribute brokers evenly across both regions.
- `replicationFactor` must be **4** to ensure even partition distribution across regions.
- `partitionCount` is unrestricted but should be based on workload requirements. See [understanding sizing and scalability behavior](../../../components/best-practices/architecture/sizing-your-environment.md#understanding-sizing-and-scalability-behavior) and [partitions](../../../components/zeebe/technical-concepts/partitions.md).

Zeebe creates partitions in a [round-robin fashion](/components/zeebe/technical-concepts/partitions.md#partition-distribution). The Helm chart places all brokers with even numbers (0, 2, 4, 6, ...) in one region and all brokers with odd numbers (1, 3, 5, 7, ...) in the other. This distribution ensures even partition replication across both regions.

#### Scaling the Zeebe cluster

When scaling, follow the [cluster scaling steps](../../components/orchestration-cluster/zeebe/operations/cluster-scaling.md) and ensure you meet the [Zeebe cluster configuration](#zeebe-cluster-configuration) requirements.

Keep both regions balanced. They should always have the same number of brokers.

### Infrastructure and deployment platform considerations

Multi-region setups require careful planning. You must manage the following areas independently. Camunda doesn't control or document them:

- **Kubernetes cluster management**: Managing multiple Kubernetes clusters and deployments across regions
- **Monitoring and alerting**: Dual-region monitoring with cross-region correlation
- **Cost implications**: Multiple clusters and cross-region traffic increase costs
- **Network reliability**: Increased latency can affect data consistency and synchronization. Even short latency bursts can have an impact.
- **Traffic management**: DNS and incoming traffic routing
- **Security**: Consistent security policies and network controls across regions

:::tip Operational readiness
Before implementing dual-region, ensure your organization has:

- Experience managing multi-cluster Kubernetes environments
- Established procedures for cross-region networking and security
- Monitoring and alerting systems with cross-region correlation capability
- Defined RTO/RPO requirements and tested recovery procedures
  :::

### Upgrade considerations

Follow the upgrade recommendations in the [Camunda Helm chart](/self-managed/upgrade/helm/index.md) and the [component-specific upgrade guides](/self-managed/upgrade/components/index.md).

Review the [upgrade overview](/self-managed/upgrade/index.md) before starting, and always create a [Camunda-supported backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md) first.

For dual-region setups, use a **staged upgrade approach**: upgrade one region at a time. Upgrading both regions simultaneously risks **quorum loss** in Zeebe partitions. Complete the upgrade in one region before starting the other, updating only one Zeebe broker at a time.

Certain **minor version upgrades** might require you to upgrade both regions simultaneously to complete migration steps. Always check the release notes and migration instructions for your version before proceeding.

## Limitations

| **Aspect**                  | **Details**                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods        | Only Kubernetes with the [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md) is supported. Alternative installation methods such as docker-compose aren't covered by our guides.                                                                                                                                                                            |
| v1 API user traffic         | Deployments using v1 APIs don't support active-active user traffic routing. All user traffic must be routed to a single primary region. See [Active-active and active-passive modes](#active-active-and-active-passive-modes).                                                                                                                                                       |
| Management Identity support | Management Identity, including multi-tenancy and role-based access control (RBAC), isn't available in this setup. The Orchestration Cluster-level Admin supports multi-tenancy and RBAC instead.                                                                                                                                                                                     |
| Optimize support            | Not supported (requires Management Identity with specific configuration).                                                                                                                                                                                                                                                                                                            |
| Connectors deployment       | Connectors can be deployed in a dual-region setup, but you must account for [idempotency](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event) to avoid event duplication. With two connector deployments running, message idempotency is critical.                                                                                                |
| Connectors                  | If you run Connectors with an inbound connector deployed in a dual-region setup: <ul><li>To delete a process deployment, do so via Operate, otherwise the inbound connector won't deregister.</li><li>If you have multiple Operate instances running, delete the process in both instances. This is a [known limitation](https://github.com/camunda/camunda/issues/17762).</li></ul> |
| Zeebe cluster scaling       | Supported. See [Zeebe cluster configuration](#zeebe-cluster-configuration).                                                                                                                                                                                                                                                                                                          |
| Web Modeler                 | Web Modeler is a standalone component not covered in this guide. Modeling applications can operate independently outside of the Orchestration Clusters. Web Modeler also depends on Management Identity.                                                                                                                                                                             |

## Region failure and recovery

In a dual-region setup, losing either region affects Camunda 8 processing because of Zeebe's quorum requirements.

When a region becomes unavailable, the Zeebe cluster loses quorum (half of its brokers become unreachable) and **immediately stops processing** new data. All components stop processing until the failover procedure completes.

:::warning Immediate impact
Region failure causes **immediate service interruption**:

- No new process instances can start.
- Running process instances are suspended.
- User interfaces become unavailable if the primary region is lost.
  :::

See the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) for recovery and re-establishment steps.

:::caution
Monitor for region failures and execute the [operational procedures](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) promptly to ensure smooth recovery.
:::

### Primary region failure

If the primary region fails:

- **Service disruption**: User traffic is unavailable.
- **Zeebe halt**: Processing stops due to quorum loss.
- **Data loss**: With v1 APIs, region-specific data (batch operations, task assignments) is lost. With v2 REST API and Tasklist V2, the Camunda Exporter replicates all data to both regions, so data remains available after region failure.

#### Recovery steps for primary region failure

1. **Temporary recovery**: Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover-phase) to restore functionality and unblock the process automation engine (Zeebe).
2. **Traffic rerouting**: With v2 APIs (default in 8.9+), remove the failed region from serving traffic (for example, via DNS or load balancer health checks). With v1 APIs, redirect user traffic to the secondary region (now primary).
3. **Data and task management** (v1 API setups only):
   - Reassign uncompleted tasks lost from the previous primary region.
   - Recreate batch operations in Operate.
4. **Permanent region setup**: Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failback-phase) to create a new secondary region.

### Secondary region failure

If the secondary region fails:

- **Zeebe halt**: Processing stops due to quorum loss.
- **UI availability**: Operate and Tasklist remain accessible from the primary region.
- **Process execution**: No new process instances can start. Zeebe suspends running instances until quorum is restored.

#### Recovery steps for secondary region failure

1. **Temporary recovery**: Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover-phase) to restore processing.
2. **Permanent region setup**: Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failback-phase) to create a new secondary region.

:::note
Unlike primary region failure, no user-facing data is lost and no traffic rerouting is necessary.
:::

## Recovery objectives (RPO and RTO) {#recovery-objectives}

Based on the requirements and limitations outlined in this page, you can use the **Recovery Point Objective (RPO)** and **Recovery Time Objective (RTO)** values below to inform your risk assessment.

The **RPO** is the maximum tolerable data loss measured in time.

The **Recovery Time Objective (RTO)** is the time required to restore services to a functional state.

For Operate, Tasklist, and Zeebe, the **RPO** is **0**.

The **RTO** applies to both the failover and failback procedures:

- **Failover** RTO: **< 1 minute** to restore a functional state, excluding DNS reconfiguration and network considerations.
- **Failback** RTO: **Five minutes plus** the time required to back up and restore Elasticsearch. This depends on your setup and chosen [Elasticsearch backup type](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types).

In internal tests, reinstalling and reconfiguring Camunda 8 takes approximately five minutes. Treat this as a general guideline. Actual times vary depending on available resources and your familiarity with the procedure.

## Related resources

- [Multi-region resilience overview](./resilience-tiers.md)
- [Cold Recovery](./cold-recovery.md)
- [Amazon EKS dual-region setup guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md): an example blueprint using managed EKS and VPC peering with Terraform. The concepts are mainly cloud-agnostic and can be adopted by other cloud providers.
- [OpenShift dual-region setup guide](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md)
- [Dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md): covers how to respond to a total region loss and how to prepare your environment for smooth recovery.
- [Camunda backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
