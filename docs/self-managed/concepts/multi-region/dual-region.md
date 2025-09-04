---
id: dual-region
title: "Dual-region setup"
sidebar_label: "Dual-region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.svg";

Camunda 8 can be deployed in a dual-region configuration with certain [limitations](#camunda-8-dual-region-limitations). This setup combines **active-active data replication** with **active-passive user traffic routing** to ensure high availability and disaster recovery.

:::caution

Before implementing a dual-region setup, ensure you understand the topic, the [limitations](#camunda-8-dual-region-limitations) of dual-region setup, and the general [considerations](#platform-considerations) of operating a dual-region setup.

:::

## Architecture overview

The dual-region setup is a **hybrid active-active/active-passive architecture**:

| **Component** | **Mode**       | **Both Regions Running** | **User Traffic**          | **RPO** |
| ------------- | -------------- | ------------------------ | ------------------------- | ------- |
| Zeebe         | Active-Active  | ✅ Required              | Both regions process data | 0       |
| Elasticsearch | Active-Active  | ✅ Required              | Data replicated to both   | 0       |
| Operate       | Active-Passive | ✅ Required              | One region serves users   | 0       |
| Tasklist      | Active-Passive | ✅ Required              | One region serves users   | 0       |

:::important Critical Understanding

**All components in both regions must be fully operational at all times.** The term "passive" refers only to user traffic routing, not system operation. Both regions actively participate in data processing and replication.

:::

## Traffic routing and terminology

### Primary and secondary regions

To avoid confusion with traditional "active-passive" terminology, we distinguish between:

- **Primary region**: Designated to serve user traffic (UI access, API calls)
- **Secondary region**: Fully operational but does not serve user traffic under normal conditions

Both regions are **operationally active** with all components running, but only the primary region handles user interactions.

### User traffic management

You are responsible for routing user traffic exclusively to the primary region through:

- DNS configuration
- Load balancer settings
- Network routing policies

In case of primary region failure, traffic must be manually redirected to the secondary region.

## Active-active vs active-passive comparison

**Active-active** setups distribute user traffic across multiple regions simultaneously, with all regions processing requests.

**Active-passive** setups designate one region for user traffic while keeping backup regions on standby.

**Camunda's hybrid approach** combines both:

- **Data layer**: Active-active replication ensures zero data loss (RPO = 0)
- **User interface layer**: Active-passive routing prevents conflicts and ensures consistency

## Disclaimer

:::caution

Running dual-region setups requires developing, testing, and executing custom [operational procedures](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md) matching your environments. This page outlines key points to consider.

:::

## Dual-region architecture

<DualRegion />

The depicted architecture consists of two regions in a Kubernetes-based installation. Each region has a Kubernetes cluster with all Camunda 8 components fully operational.

**Region 0** is designated as the **primary** region serving user traffic. **Region 1** is the **secondary** region, fully operational but not serving user traffic. Both regions actively participate in data processing and replication.

Zeebe stretches across regions using the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), allowing communication and data replication between all brokers. Zeebe exports data to Elasticsearch instances in both regions. Operate and Tasklist in both regions import data but only the primary region serves users.

### Components operational requirements

#### Zeebe

- **Mode**: Active-active
- **Requirement**: All brokers in both regions must be running
- **Function**: Leaders and followers distributed across regions
- **Data replication**: Continuous across all brokers

#### Elasticsearch

- **Mode**: Active-active
- **Requirement**: Both instances must be running
- **Function**: Receives exports from Zeebe continuously
- **Critical**: If secondary region Elasticsearch is down, Zeebe exporters may fail

#### Operate and Tasklist

- **Mode**: Active-passive (user traffic only)
- **Requirement**: Both instances must be running and importing data
- **Function**: Both regions maintain up-to-date data, only primary serves users
- **Data loss risk**: If not running, data may be lost after Zeebe retention period

### User traffic

The system operates with **active-passive user traffic routing**. You must designate one region as **primary** and ensure all user traffic is directed there. The secondary region remains fully operational but does not serve user requests.

Traffic management responsibilities:

- Configure DNS to route to primary region
- Implement health checks and failover procedures
- Manually redirect traffic during primary region failure

### Components

The currently supported Camunda 8 Self-Managed components are:

- Zeebe (workflow engine)
- Elasticsearch (database)
- Operate
- Tasklist

#### Zeebe

Zeebe operates in **active-active** mode with data replication between all brokers across regions. Both regions host leaders and followers for different partitions, requiring all brokers to be operational for proper functioning.

Key points:

- Leaders and followers distributed across both regions
- Continuous data replication via Raft protocol
- Both regions required for quorum maintenance
- Can handle region failure without data loss when properly configured

#### Elasticsearch

Elasticsearch operates in **active-active** mode for data ingestion, with Zeebe exporting to both instances simultaneously.

Important considerations:

- Each region has its own Elasticsearch instance
- Zeebe exports to both instances continuously
- Both instances must be operational to prevent export failures
- Data consistency maintained through Zeebe's export mechanism

#### Operate and Tasklist

These components run in **active-passive** mode for user traffic but **must be operational in both regions** for data import and processing.

Critical requirements:

- Both instances must run continuously to import data from Elasticsearch
- Only primary region serves user traffic
- Both regions maintain synchronized data state
- Data loss possible if secondary region stops importing

Data specific to each region (not replicated through Zeebe):

- **Operate**: Uncompleted batch operations
- **Tasklist**: Task assignments

## Requirements and limitations

### Installation environment

Two Kubernetes clusters are required for the Helm chart installation.

Amazon OpenSearch is **not supported** in dual-region configurations.

#### Network requirements

- Kubernetes clusters, services, and pods must not have overlapping CIDRs. Each cluster must use distinct CIDRs that do not conflict or overlap with those of any other cluster to avoid routing issues.
- The regions (for example, two Kubernetes clusters) must be able to communicate with each other (for example, via VPC peering). See [example implementation](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/dual-region.md) for AWS EKS.
  - Kubernetes services in one cluster must be resolvable and reachable from the other cluster and vice-versa. This is essential for proper communication and functionality across regions:
    - For AWS EKS setups, ensure DNS chaining is configured. Refer to the [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/dual-region.md).
    - For OpenShift, [Submariner](https://docs.redhat.com/en/documentation/red_hat_advanced_cluster_management_for_kubernetes/2.11/html/networking/networking#submariner) is recommended for handling multi-cluster networking. Refer to the [OpenShift dual-region setup guide](/self-managed/installation-methods/helm/cloud-providers/openshift/dual-region.md).
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

| **Aspect**            | **Details**                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods  | <p><ul><li>For **Kubernetes** we recommend using a dual-region Kubernetes setup with the [Camunda Helm chart](/self-managed/installation-methods/helm/install.md) installed in two Kubernetes clusters.</li><li>For **other platforms**, using alternative installation methods (for example, with docker-compose) is not covered by our guides.</li></ul></p>                                                                                                              |
| Traffic Management    | <p>**Hybrid Active-Active/Active-Passive Architecture**</p><p><ul><li>**Data Layer**: Active-active replication with zero RPO</li><li>**User Traffic**: Active-passive routing to prevent conflicts</li><li>**All Components**: Must be operational in both regions</li></ul></p>                                                                                                                                                                                           |
| Identity Support      | <p>Identity, including multi-tenancy and Role-Based Access Control (RBAC), has specific requirements in dual-region setups:</p><p><ul><li>**External Identity Provider**: Recommended approach using external IdP</li><li>**Shared Database**: Single PostgreSQL instance accessible from both regions</li><li>**Not Supported**: Independent Identity instances per region</li></ul></p>                                                                                   |
| Optimize Support      | Not supported (requires Identity with specific configuration).                                                                                                                                                                                                                                                                                                                                                                                                              |
| Connectors Deployment | Connectors can be deployed in a dual-region setup, but attention to [idempotency](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event) is required to avoid event duplication. In a dual-region setup, you'll have two connector deployments and using message idempotency is of importance to not duplicate events.                                                                                                                      |
| Connectors            | If you are running Connectors and have a process with an inbound connector deployed in a dual-region setup, consider the following: <ul><li> when you want to delete the process deployment, delete it via Operate, otherwise the inbound connector won't deregister.</li><li>if you have multiple Operate instances running, then perform the delete operation in both instances. This is a [known limitation](https://github.com/camunda/camunda/issues/17762).</li></ul> |
| Zeebe Cluster Scaling | Not supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Web Modeler           | Web Modeler is a standalone component that is not covered in this guide. Modelling applications can operate independently outside of the orchestration clusters.                                                                                                                                                                                                                                                                                                            |

### Identity configuration for dual-region

For dual-region setups requiring user interfaces (Tasklist, Operate), Identity configuration requires special consideration:

#### Supported approaches:

1. **External Identity Provider**: Use an external IdP (like Azure AD, Okta) accessible from both regions
2. **Shared PostgreSQL**: Single database instance accessible from both regions
3. **Externally managed Identity**: Identity service running outside both regions

#### Not supported:

- Independent Identity instances per region (permissions and users won't be synchronized)
- Multiple PostgreSQL databases without replication

### Infrastructure and deployment platform considerations

Multi-region setups come with inherent complexities, and it is essential to fully understand these challenges before selecting a dual-region configuration.

The following areas must be managed independently, and are not controlled by Camunda or covered by our guides:

- Managing multiple Kubernetes clusters and their deployments across regions.
- Dual-region monitoring and alerting.
- Increased costs of multiple clusters and cross-region traffic.
- Data consistency and synchronization challenges (for example, brought in by the increased latency).
  - Bursts of increased latency can already have an impact.
- Managing DNS and incoming traffic.

### Upgrade considerations

When upgrading a dual-region setup, it is crucial to follow a staged approach. Perform the upgrade in one region first before proceeding to the other.

Simultaneously upgrading both regions can result in a loss of quorum for partitions, as two Zeebe brokers might be upgraded at the same time. To prevent this issue, it is recommended to upgrade one region at a time, ensuring that only one Zeebe broker is updated during each upgrade phase.

## Region loss

In a dual-region setup, loss of either region will affect Camunda 8's processing capability due to quorum requirements.

When a region becomes unavailable, the Zeebe cluster loses quorum (half of brokers unreachable) and stops processing new data. This affects all components as they cannot update or process new workflows until the failover procedure completes.

The [operational procedure](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md) details recovery from region loss and re-establishment procedures.

:::caution
Customers are expected to proactively monitor for regional failures and take ownership of executing the necessary [operational procedures](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md) to ensure smooth recovery and failover.
:::

### Primary region loss

The total loss of the primary region results in:

- **Service disruption**: User traffic can no longer be served
- **Workflow engine halt**: Processing stops due to quorum loss
- **Data loss**: Region-specific data (batch operations, task assignments) will be lost

#### Recovery steps for primary region loss

1. **Temporary recovery:** Follow the [operational procedure for temporary recovery](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md#failover) to restore functionality and unblock the workflow engine.
2. **Traffic rerouting:** Redirect user traffic to the secondary region (now becoming primary).
3. **Data and task management**:
   - Reassign uncompleted tasks lost from the previous primary region
   - Recreate batch operations in Operate
4. **Permanent region setup:** Follow the [operational procedure to create a new secondary region](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md#failback).

### Secondary region loss

The loss of the secondary region results in:

- **Workflow engine halt**: Processing stops due to quorum loss
- **No user impact**: Traffic continues to be served by primary region during recovery

#### Recovery steps for secondary region loss

1. **Temporary recovery:** Follow the [operational procedure to temporarily recover](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md#failover) and restore processing.
2. **Permanent region setup:** Follow the [operational procedure to create a new secondary region](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md#failback).

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

- Familiarize yourself with our [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/dual-region.md). This showcases an example blueprint setup in AWS that utilizes the managed EKS and VPC peering for a dual-region setup with Terraform.
  - The concepts in the guide are mainly cloud-agnostic, and the guide can be adopted by other cloud providers.
- Familiarize yourself with the [operational procedure](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
