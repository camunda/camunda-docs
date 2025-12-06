---
id: dual-region
title: "Dual-region"
sidebar_label: "Dual-region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.jpg";

Camunda 8 can be deployed in a dual-region configuration with certain [limitations](#camunda-8-dual-region-limitations). This setup combines **active-active data replication** with **active-passive user traffic routing** (see [Active-active](#active-active)) to ensure high availability and disaster recovery.

:::important
**Both regions must be fully operational at all times.** The only distinction is traffic routing: one region serves user traffic (primary), the other processes data but doesn't serve user traffic (secondary).
:::

:::caution

Before implementing a dual-region setup, ensure you understand the topic, the [limitations](#camunda-8-dual-region-limitations) of dual-region setup, and the general [considerations](#platform-considerations) of operating a dual-region setup.

:::

## Architecture overview

The dual-region setup is a hybrid active-active/active-passive architecture:

|                                 **Component** | **Mode**                                             | **Both Regions Running** | **User Traffic**          | **RPO** |
| --------------------------------------------: | ---------------------------------------------------- | ------------------------ | ------------------------- | ------- |
| <p align="left">**Orchestration Cluster**</p> |                                                      | ✅ Required              |                           |         |
|                                         Zeebe | Active-active                                        | ✅ Required              | Both regions process data | 0       |
|                                      Identity | Active-active                                        | ✅ Required              | Cluster-level identity    | 0       |
|                                       Operate | Active-passive (see [Active-active](#active-active)) | ✅ Required              | One region serves users   | 0       |
|                                      Tasklist | Active-passive (see [Active-active](#active-active)) | ✅ Required              | One region serves users   | 0       |
|         <p align="left">**Elasticsearch**</p> | Active-active                                        | ✅ Required              | Data replicated to both   | 0       |

:::important

**All components in both regions must be fully operational at all times.** "Passive" refers only to user traffic routing, not system operation. Both regions actively participate in data processing and replication.

:::

## Traffic routing and terminology

### Primary and secondary regions

To avoid confusion with traditional "active-passive" terminology, we distinguish between:

- **Primary region**: Serves user traffic (UI access, API calls).
- **Secondary region**: Fully operational but does not serve user traffic under normal conditions.

Both regions are operationally active with all components running, but only the primary region handles user interactions.

### User traffic management

You must route user traffic exclusively to the primary region [(\*)](#active-active). Methods include:

- DNS configuration
- Load balancer settings
- Network routing policies

If the primary region fails, traffic must be redirected manually to the secondary region.

## Active-active vs active-passive comparison

- **Active-active** setups distribute user traffic across multiple regions simultaneously, with all regions processing requests.

- **Active-passive** setups designate one region for user traffic while keeping backup regions on standby.

- **Camunda's hybrid approach** combines both:
  - **Data layer**: Active-active replication ensures zero data loss (RPO = 0).
  - **User interface layer**: Active-passive routing prevents conflicts and ensures consistency.

## Disclaimer

:::caution

Running dual-region setups requires developing, testing, and executing custom [operational procedures](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) matching your environments. This page outlines key points to consider.

:::

:::info Active-Active <a id="active-active"></a>

Starting in Camunda 8.8, the **v2 REST API** and **Tasklist V2** remove previous region-specific limitations. By using the v2 REST API for batch operations and enabling [Tasklist V2 mode](/components/tasklist/api-versions.md), you can avoid regional data loss, as data is replicated through the Camunda Exporter rather than confined to the region where the operation originated.

These improvements also make a user-facing **active-active** setup feasible. Starting with version 8.9, this configuration will become the default for dual-region deployments. This note serves as an early indication that **active-active** functionality is already supported.

:::

## Dual-region architecture

<img src={DualRegion} alt="Camunda dual-region architecture" style={{border: 'none'}} />

The dual-region architecture consists of two regions in a Kubernetes-based installation. Each region has a Kubernetes cluster with all Camunda 8 components fully operational.

- **Region 0** is the primary region serving user traffic.
- **Region 1** is the secondary region, fully operational but not serving user traffic.

Both regions actively participate in data processing and replication.

:::note
The visual representation shows both regions as operational. Any grayed-out appearance in the diagram represents user traffic routing, not system operational status. All components in both regions must be running and operational.
:::

The Orchestration Cluster consists of multiple components:

- Zeebe stretches across regions using the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), allowing communication and data replication between all brokers.
- Zeebe exports data to Elasticsearch instances in both regions using the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).
- Using the new exporters ensures that Operate and Tasklist data is the same in both regions besides some v1 API related operations that are still region specific. See [active-active](#active-active).
- Identity is embedded in the Orchestration Cluster and provides cluster-level identity management.

### User traffic

The system uses active-passive user traffic routing. You must designate one region as the primary and route all user traffic to it. The secondary region remains fully operational but does not serve user requests (see [Active-active](#active-active)).

Traffic management responsibilities:

- Configure DNS to route to primary region.
- Implement health checks and failover procedures.
- Manually redirect traffic during primary region failure in combination with the [operational failover procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover).

:::warning Operation requirement

Traffic redirection must be performed as part of the complete failover procedure. Redirecting traffic without following the operational procedure can lead to system inconsistencies and data issues.

:::

### Components

The currently supported Camunda 8 Self-Managed components are:

- Orchestration Cluster
  - Zeebe (process automation engine)
  - Identity
  - Operate
  - Tasklist
- Elasticsearch (database)

#### Component requirements

|                                     Component | Mode                                                                | Requirement                           | Function                                                                                                                                                                                                                                                                                                                             | Data loss risk                                                                      |
| --------------------------------------------: | ------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <p align="left">**Orchestration Cluster**</p> |                                                                     |                                       |                                                                                                                                                                                                                                                                                                                                      |                                                                                     |
|                                         Zeebe | Active-active                                                       | All brokers in both regions must run  | <ul><li>Leaders and followers distributed across regions</li><li>Continuous replication via Raft protocol</li><li>Both regions required for quorum maintenance</li></ul>                                                                                                                                                             | Can handle region failure without data loss when properly configured                |
|                                      Identity | Active-active                                                       | Embedded in the Orchestration cluster | <ul><li>Identity provides unified, cluster-level identity management and authorization</li></ul>                                                                                                                                                                                                                                     | Can handle region failure without data loss                                         |
|                                       Operate | Active-passive (user traffic) (see [Active-active](#active-active)) | Embedded in the Orchestration cluster | <ul><li>Both regions maintain synchronized data state</li><li>Only primary serves users</li><li>**Region-specific data**: Uncompleted batch operations if not submitted via v2 API</li></ul>                                                                                                                                         | Data loss possible if using v1 API as changes are isolated to the initiated region. |
|                                      Tasklist | Active-passive (user traffic) (see [Active-active](#active-active)) | Embedded in the Orchestration cluster | <ul><li>Both regions maintain synchronized data state</li><li>Only primary serves users</li><li>**Region-specific data**: Task assignments if not utilizing Tasklist v2 API</li></ul>                                                                                                                                                | Data loss possible if using v1 API as changes are isolated to the initiated region. |
|         <p align="left">**Elasticsearch**</p> | Active-active                                                       | Both clusters must run                | <ul><li>Independent clusters in each region</li><li>Zeebe exports identical data to both continuously and directly</li><li>Data consistency maintained through Zeebe's dual export mechanism, not Elasticsearch replication</li><li>The clusters do not communicate with each other—replication happens at the Zeebe level</li></ul> | Zeebe exporters may fail globally if secondary ES is down                           |

## Requirements and limitations

### Installation environment

Two Kubernetes clusters are required for the Helm chart installation.

:::note
OpenSearch is **not supported** in dual-region configurations.
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

### Camunda 8 dual-region limitations

| **Aspect**                  | **Details**                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods        | <p><ul><li>For Kubernetes we recommend using a dual-region Kubernetes setup with the [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md) installed in two Kubernetes clusters.</li><li>For other platforms, using alternative installation methods (for example, docker-compose) is not covered by our guides.</li></ul></p>                                                                                                                       |
| Traffic Management          | <p>Hybrid active-active/active-passive architecture:</p><p><ul><li>**Data Layer**: Active-active replication with zero RPO.</li><li>**User Traffic**: Active-passive routing to prevent conflicts.</li><li>**All Components**: Must be operational in both regions.</li></ul></p>                                                                                                                                                                                           |
| Management Identity Support | Management Identity, including multi-tenancy and role-based access control (RBAC), is currently unavailable in this setup. Multi-tenancy and RBAC are supported using the Orchestration Cluster level Identity.                                                                                                                                                                                                                                                             |
| Optimize Support            | Not supported (requires Management Identity with specific configuration).                                                                                                                                                                                                                                                                                                                                                                                                   |
| Connectors Deployment       | Connectors can be deployed in a dual-region setup, but attention to [idempotency](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event) is required to avoid event duplication. In a dual-region setup, you'll have two connector deployments, so using message idempotency is critical.                                                                                                                                                   |
| Connectors                  | If you are running Connectors and have a process with an inbound connector deployed in a dual-region setup, consider the following: <ul><li> when you want to delete the process deployment, delete it via Operate, otherwise the inbound connector won't deregister.</li><li>if you have multiple Operate instances running, then perform the delete operation in both instances. This is a [known limitation](https://github.com/camunda/camunda/issues/17762).</li></ul> |
| Zeebe Cluster Scaling       | Not supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
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

Follow the upgrade recommendations provided in the [Camunda Helm chart](/self-managed/deployment/helm/upgrade/index.md) and the [component-specific upgrade guides](/self-managed/components/components-upgrade/introduction.md).

The general procedure outlined in the [upgrade overview](/self-managed/update/administrators/overview.md) also applies. Before starting, always create a [Camunda-supported backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md).

For dual-region setups, use a **staged upgrade approach**: upgrade one region at a time.
Upgrading both regions simultaneously can cause a **loss of quorum** in Zeebe partitions if brokers in both regions are upgraded at once. To prevent this, complete the upgrade in one region before proceeding with the other, ensuring that only one Zeebe broker is updated during each phase.

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
- **Data loss**: Region-specific data such as batch operations and task assignments is lost (see [Active-active](#active-active))

#### Recovery steps for primary region loss

1. **Temporary recovery:** Follow the [operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover-phase) for temporary recovery to restore functionality and unblock the process automation engine (zeebe).
2. **Traffic rerouting:** Redirect user traffic to the secondary region (now primary).
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
