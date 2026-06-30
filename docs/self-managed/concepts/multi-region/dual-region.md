---
id: dual-region
title: "Dual-region"
sidebar_label: "Dual-region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.jpg";

Camunda 8 can be deployed in a dual-region configuration with certain [limitations](#camunda-8-dual-region-limitations). Starting with version 8.9, this setup runs **active-active** by default — both regions process data and serve user traffic (see [active-active](#active-active)).

:::important
**Both regions must be fully operational at all times.** Both regions serve user traffic simultaneously.
:::

:::caution

Before implementing a dual-region setup, ensure you understand the topic, the [limitations](#camunda-8-dual-region-limitations) of dual-region setup, and the general [considerations](#platform-considerations) of operating a dual-region setup.

:::

## Architecture overview

The dual-region setup is active-active (8.9+):

|                                 **Component** | **Mode**      | **Both Regions Running** | **User Traffic**          | **RPO** |
| --------------------------------------------: | ------------- | ------------------------ | ------------------------- | ------- |
| <p align="left">**Orchestration Cluster**</p> |               | ✅ Required              |                           |         |
|                                         Zeebe | Active-active | ✅ Required              | Both regions process data | 0       |
|                                         Admin | Active-active | ✅ Required              | Cluster-level identity    | 0       |
|                                       Operate | Active-active | ✅ Required              | Both regions serve users  | 0       |
|                                      Tasklist | Active-active | ✅ Required              | Both regions serve users  | 0       |
|         <p align="left">**Elasticsearch**</p> | Active-active | ✅ Required              | Data replicated to both   | 0       |

:::important

**All components in both regions must be fully operational at all times.** Both regions actively participate in data processing and replication.

:::

## Traffic routing and terminology

### Primary and secondary regions

**Both regions serve user traffic simultaneously** — there is no primary/secondary distinction at the UI layer. Load can be distributed across regions via DNS or load balancer.

Both regions are operationally active with all components running and replicating data.

### User traffic management

User traffic can be served from both regions simultaneously. Distribute traffic via DNS, load balancer, or network routing policies as appropriate for your setup.

## Active-active vs active-passive comparison

- **Active-active** setups distribute user traffic across multiple regions simultaneously, with all regions processing requests.

- **Active-passive** setups designate one region for user traffic while keeping backup regions on standby.

- **Camunda's approach**: Active-active for both data and user traffic:
  - **Data layer**: Active-active replication ensures zero data loss (RPO = 0).
  - **User interface layer**: Active-active — both regions serve user traffic; consistency is maintained because all writes flow through the Camunda Exporter, not region-local stores.

## Disclaimer

:::caution

Running dual-region setups requires developing, testing, and executing custom [operational procedures](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) matching your environments. This page outlines key points to consider.

:::

:::info Active-Active <a id="active-active"></a>

Starting in Camunda 8.8, the Orchestration Cluster REST API removed previous region-specific limitations. Both regions serve user traffic simultaneously, and all data is replicated via the Camunda Exporter.

:::

## Dual-region architecture

<img src={DualRegion} alt="Camunda dual-region architecture" style={{border: 'none'}} />

The dual-region architecture consists of two regions in a Kubernetes-based installation. Each region has a Kubernetes cluster with all Camunda 8 components fully operational.

Both regions serve user traffic simultaneously and actively participate in data processing and replication.

:::note
The visual representation shows both regions as operational. Any grayed-out appearance in the diagram represents user traffic routing, not system operational status. All components in both regions must be running and operational.
:::

The Orchestration Cluster consists of multiple components:

- Zeebe stretches across regions using the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), allowing communication and data replication between all brokers.
- Zeebe exports data to Elasticsearch instances in both regions using the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).
- Using the new exporters ensures that Operate and Tasklist data is the same in both regions. See [active-active](#active-active).
- Admin is embedded in the Orchestration Cluster and provides cluster-level identity management.

### User traffic

Both regions serve user traffic simultaneously. Traffic can be distributed via DNS, load balancer, or network routing policies.

:::warning Operation requirement

Traffic redirection must be performed as part of the complete failover procedure. Redirecting traffic without following the operational procedure can lead to system inconsistencies and data issues.

:::

### Components

The currently supported Camunda 8 Self-Managed components are:

- Orchestration Cluster
  - Zeebe (process automation engine)
  - Admin
  - Operate
  - Tasklist
- Elasticsearch (database)

#### Component requirements

|                                     Component | Mode          | Requirement                           | Function                                                                                                                                                                                                                                                                                                                             | Data loss risk                                                       |
| --------------------------------------------: | ------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| <p align="left">**Orchestration Cluster**</p> |               |                                       |                                                                                                                                                                                                                                                                                                                                      |                                                                      |
|                                         Zeebe | Active-active | All brokers in both regions must run  | <ul><li>Leaders and followers distributed across regions</li><li>Continuous replication via Raft protocol</li><li>Both regions required for quorum maintenance</li></ul>                                                                                                                                                             | Can handle region failure without data loss when properly configured |
|                                         Admin | Active-active | Embedded in the Orchestration cluster | <ul><li>Admin provides unified, cluster-level identity management and authorization</li></ul>                                                                                                                                                                                                                                        | Can handle region failure without data loss                          |
|                                       Operate | Active-active | Embedded in the Orchestration cluster | <ul><li>Both regions maintain synchronized data state</li><li>Both regions serve users</li></ul>                                                                                                                                                                                                                                     | No data loss — all data is replicated via the Camunda Exporter.      |
|                                      Tasklist | Active-active | Embedded in the Orchestration cluster | <ul><li>Both regions maintain synchronized data state</li><li>Both regions serve users</li></ul>                                                                                                                                                                                                                                     | No data loss — all data is replicated via the Camunda Exporter.      |
|         <p align="left">**Elasticsearch**</p> | Active-active | Both clusters must run                | <ul><li>Independent clusters in each region</li><li>Zeebe exports identical data to both continuously and directly</li><li>Data consistency maintained through Zeebe's dual export mechanism, not Elasticsearch replication</li><li>The clusters do not communicate with each other—replication happens at the Zeebe level</li></ul> | Zeebe exporters may fail globally if secondary ES is down            |

## Requirements and limitations

### Installation environment

Two Kubernetes clusters are required for the Helm chart installation.

:::note
OpenSearch is **not supported** in dual-region configurations.
:::

:::note
RDBMS (relational database) secondary storage is **not supported** in dual-region configurations.
:::

#### Network requirements

- Kubernetes clusters, services, and pods must not have overlapping CIDRs. Each cluster must use distinct CIDRs that do not conflict or overlap with those of any other cluster to avoid routing issues.
- The regions (for example, two Kubernetes clusters) must be able to communicate with each other (for example, via VPC peering). See [example implementation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md) for AWS EKS.
  - Kubernetes services in one cluster must be resolvable and reachable from the other cluster and vice-versa. This is essential for proper communication and functionality across regions:
    - For AWS EKS setups, ensure DNS chaining is configured. Refer to the [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md).
    - For OpenShift, [Submariner](https://docs.redhat.com/en/documentation/red_hat_advanced_cluster_management_for_kubernetes/2.11/html/networking/networking#submariner) is recommended for handling multi-cluster networking. Refer to the [OpenShift dual-region setup guide](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md).
- Maximum network round trip time (**RTT**) between regions should not exceed **100 ms**.
- Required open ports between the two regions:
  - **9200** for Elasticsearch (for cross-region data pushed by Zeebe).
  - **26500** for communication to the Zeebe Gateway from clients/workers.
  - **26501** and **26502** for communication between Zeebe brokers and the Zeebe Gateway.

### Zeebe cluster configuration

The following Zeebe brokers and replication configuration are supported:

- `clusterSize` must be a multiple of **2** and at least **4** to evenly distribute brokers across the two regions.
- `replicationFactor` must be **4** to ensure even partition distribution across regions.
- `partitionCount` is unrestricted but should be chosen based on workload requirements. See [understanding sizing and scalability behavior](../../../components/best-practices/architecture/sizing-your-environment.md#understanding-sizing-and-scalability-behavior). For more details on partition distribution, see [documentation on partitions](../../../components/zeebe/technical-concepts/partitions.md).

Zeebe creates partitions in a [round-robin fashion](/components/zeebe/technical-concepts/partitions.md#partition-distribution). The Helm charts ensures that all brokers with even numbers (0, 2, 4, 6, ...) are created in the same region. The brokers with uneven numbers (1, 3, 5, 7, ...) are created in the other region.

This numbering and the round-robin partition distribution assures the even replication across the two regions.

#### Scaling Zeebe cluster

Follow the [Cluster Scaling steps](../../components/orchestration-cluster/zeebe/operations/cluster-scaling.md) respecting the [Zeebe cluster configuration](#zeebe-cluster-configuration).

- The cluster should be evenly scaled, keeping the regions balanced with the same number of brokers.

### Camunda 8 dual-region limitations

| **Aspect**                  | **Details**                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods        | <p><ul><li>For Kubernetes we recommend using a dual-region Kubernetes setup with the [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md) installed in two Kubernetes clusters.</li><li>For other platforms, using alternative installation methods (for example, docker-compose) is not covered by our guides.</li></ul></p>                                                                                                                       |
| Traffic Management          | <p><ul><li>**Data Layer**: Active-active replication with zero RPO (all setups).</li><li>**User Traffic**: Active-active — both regions serve user traffic simultaneously.</li><li>**All Components**: Must be operational in both regions.</li></ul></p>                                                                                                                                                                                                                   |
| Management Identity Support | Management Identity, including multi-tenancy and role-based access control (RBAC), is currently unavailable in this setup. Multi-tenancy and RBAC are supported using the Orchestration Cluster level Admin.                                                                                                                                                                                                                                                                |
| Optimize Support            | Not supported (requires Management Identity with specific configuration).                                                                                                                                                                                                                                                                                                                                                                                                   |
| Connectors Deployment       | Connectors can be deployed in a dual-region setup, but attention to [idempotency](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event) is required to avoid event duplication. In a dual-region setup, you'll have two connector deployments, so using message idempotency is critical.                                                                                                                                                   |
| Connectors                  | If you are running Connectors and have a process with an inbound connector deployed in a dual-region setup, consider the following: <ul><li> when you want to delete the process deployment, delete it via Operate, otherwise the inbound connector won't deregister.</li><li>if you have multiple Operate instances running, then perform the delete operation in both instances. This is a [known limitation](https://github.com/camunda/camunda/issues/17762).</li></ul> |
| Zeebe Cluster Scaling       | Supported. See [Zeebe cluster configuration](#zeebe-cluster-configuration)                                                                                                                                                                                                                                                                                                                                                                                                  |
| Web Modeler                 | Web Modeler is a standalone component that is not covered in this guide. Modelling applications can operate independently outside of the orchestration clusters. Web Modeler also has a dependency on Management Identity.                                                                                                                                                                                                                                                  |

### Infrastructure and deployment platform considerations

Multi-region setups come with inherent complexities, and it is essential to fully understand these challenges before selecting a dual-region configuration.

The following areas must be managed independently, and are not controlled by Camunda or covered by our guides:

- **Kubernetes cluster management**: Managing multiple Kubernetes clusters and their deployments across regions
- **Monitoring and alerting**: Dual-region monitoring and alerting with cross-region correlation
- **Cost implications**: Increased costs of multiple clusters and cross-region traffic
- **Network reliability**: Data consistency and synchronization challenges (for example, brought in by the increased latency)
  - Bursts of increased latency can already have an impact
- **Traffic management**: Managing DNS and incoming traffic routing
- **Security**: Ensuring consistent security policies and network controls across regions
- **Backup and disaster recovery**: Coordinating backup strategies across regions

:::tip Operational Readiness
Before implementing dual-region, ensure your organization has:

- Experience managing multi-cluster Kubernetes environments
- Established procedures for cross-region networking and security
- Monitoring and alerting systems capable of cross-region correlation
- Defined RTO/RPO requirements and tested recovery procedures
  :::

### Upgrade considerations

Follow the upgrade recommendations provided in the [Camunda Helm chart](/self-managed/upgrade/helm/index.md) and the [component-specific upgrade guides](/self-managed/upgrade/components/index.md).

The general procedure outlined in the [upgrade overview](/self-managed/upgrade/index.md) also applies. Before starting, always create a [Camunda-supported backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

For dual-region setups, use a **staged upgrade approach**: upgrade one region at a time.
Upgrading both regions simultaneously can cause a **loss of quorum** in Zeebe partitions if brokers in both regions are upgraded at once. To prevent this, complete the upgrade in one region before proceeding with the other, ensuring that only one Zeebe Broker is updated during each phase.

However, for certain **minor version upgrades**, simultaneous upgrades of both regions may be required to complete migration steps successfully. Always consult the release notes and migration instructions for your specific version before proceeding.

## Region loss

In a dual-region setup, loss of either region affects Camunda 8's processing capability due to quorum requirements.

When a region becomes unavailable, the Zeebe cluster loses quorum (half of brokers unreachable) and **immediately stops processing** new data. This affects all components as they cannot update or process new processes until the failover procedure completes.

:::warning Immediate Impact
Region failure results in **immediate service interruption**:

- No new process instances can start
- Running process instances are suspended
- User interfaces become unavailable if primary region is lost
  :::

See the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) for recovery steps from region loss and re-establishment procedures.

:::caution
You must monitor for region failures and execute the necessary [operational procedures](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) to ensure smooth recovery and failover.
:::

### Primary region loss

If the primary region is lost:

- **Service disruption**: User traffic is unavailable
- **Zeebe halt**: Processing stops due to quorum loss
- **Data loss**: No data loss — all data is replicated via the Camunda Exporter and survives region loss (see [Active-active](#active-active)).

#### Recovery steps for primary region loss

1. **Temporary recovery:** Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover-phase) for temporary recovery to restore functionality and unblock the process automation engine (zeebe).
2. **Traffic rerouting:** Remove the failed region from serving traffic (for example, via DNS or load balancer health checks).
3. **Data and task management**:
   - Reassign uncompleted tasks lost from the previous primary region.
   - Recreate batch operations in Operate.
4. **Permanent region setup:** Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failback-phase) to create a new secondary region.

### Secondary region loss

If the secondary region is lost:

- **Zeebe halt**: Processing stops due to quorum loss.
- **No user impact**: Traffic continues to be served by the primary region during recovery.

#### Recovery steps for secondary region loss

1. **Temporary recovery:** Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover) to temporarily recover and restore processing.
2. **Permanent region setup:** Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failback) to create a new secondary region.

:::note
Unlike primary region loss, no user-facing data is lost and no traffic rerouting is necessary.
:::

### Disaster recovery

Based on all the limitations and requirements outlined in this article, you can consider the **Recovery Point Objective (RPO)** and **Recovery Time Objective (RTO)** in case of a disaster recovery to help with the risk assessment.

The **RPO** is the maximum tolerable data loss measured in time.

The **RTO** is the time to restore services to a functional state.

For Operate, Tasklist, and Zeebe, the **RPO** is **0**.

The **RTO** can be considered for the **failover** and **failback** procedures, both of which result in a functional state.

- **failover** has an **RTO** of **< 1** minute to restore a functional state, excluding DNS reconfiguration and Networking considerations.
- **failback** has an **RTO** of **5 + X** minutes to restore a functional state, where X is the time it takes to back up and restore Elasticsearch. This timing is highly dependent on the setup and chosen [Elasticsearch backup type](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types).

During our automated tests, the reinstallation and reconfiguration of Camunda 8 takes 5 minutes. This can serve as a general guideline for the time required, though your experience may vary depending on your available resources and familiarity with the operational procedure.

:::info
The **Recovery Time Objective (RTO)** estimates are based on our internal tests and should be considered approximate. Actual times may vary depending on the specific manual steps and conditions during the recovery process.
:::

## Further resources

- Familiarize yourself with our [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md). This showcases an example blueprint setup in AWS that utilizes the managed EKS and VPC peering for a dual-region setup with Terraform.
  - The concepts in the guide are mainly cloud-agnostic, and the guide can be adopted by other cloud providers.
- Familiarize yourself with the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
