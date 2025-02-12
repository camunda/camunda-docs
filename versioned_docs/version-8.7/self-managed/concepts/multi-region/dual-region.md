---
id: dual-region
title: "Dual-region"
sidebar_label: "Dual-region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.svg";

Camunda 8 can be deployed in a dual-region configuration with certain [limitations](#camunda-8-dual-region-limitations). Dual-region deployments are considered **active-passive,** where one region handles user traffic, and the other acts as a standby.

:::caution

Before implementing a dual-region setup, ensure you understand the topic, the [limitations](#camunda-8-dual-region-limitations) of dual-region setup, and the general [considerations](#platform-considerations) of operating a dual-region setup.

:::

## Active-active vs active-passive

**Active-active** and **active-passive** are standard setups used in dual-region configurations to ensure that applications remain available and operational in case of failures.

In an **active-active** setup, multiple instances of an application or system are deployed in different regions or locations, and all instances actively process requests simultaneously. This setup ensures high availability and load balancing by distributing traffic across multiple regions.

In an **active-passive** setup, one instance or region is designated as the active region, handling all requests and processing. The passive region receives replicated data but remains idle, not processing client traffic unless the active region becomes unavailable. When a failure occurs in the active region, the passive region is activated, taking over the operations, usually after a manual or automated failover process.

## Disclaimer

:::caution

Running dual-region setups requires developing, testing, and executing custom [operational procedures](./../../operational-guides/multi-region/dual-region-ops.md) matching your environments. This page outlines key points to consider.

:::

## Dual-region architecture

<DualRegion />

The depicted architecture consists of two regions in a Kubernetes-based installation. Each region has a Kubernetes cluster, which includes key Camunda 8 components. These clusters communicate, but only the active region handles user traffic.

**Region 0** (highlighted in green) is considered **active**, and **Region 1** is considered **passive**. User traffic must only reach the **active** region. In this case, user traffic would only go to Region 0. Region 1 is considered passive and used in case of the loss of the active region. Due to Zeebe's data replication, you can recover from an active region loss by utilizing the passive region without much downtime.

Zeebe stretches across the regions due to its use of the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), allowing it to communicate and replicate data between all brokers. Zeebe exports data to two Elasticsearch instances, one in each region. Operate and Tasklist are connected to the local Elasticsearch infrastructure.

### User traffic

The system operates primarily in an **active-passive** configuration, though some components may function in **active-active** mode. It is your responsibility to manage user traffic routing, including DNS configurations, as this is not handled automatically. Designate one region as the **active** region to serve all user traffic and ensure that traffic is directed there. In the event of a complete failure of the active region, you will need to manually reroute traffic to the **passive** region to maintain availability. The system does not cover traffic management beyond this scope.

### Components

The currently supported Camunda 8 Self-Managed components are:

- Zeebe (workflow engine)
- Elasticsearch (database)
- Operate
- Tasklist

#### Zeebe

Zeebe operates in an **active-active** mode and replicates data between its brokers. Due to its replication logic, it can handle an entire region failure without data loss, but it requires proper partitioning and replication. Read through the [cluster technical concept](./../../../components/zeebe/technical-concepts/clustering.md) to learn more about the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>).

#### Elasticsearch

We treat Elasticsearch as an **active-passive** component. While it can be stretched across regions, this is not officially supported and may impact Zeebe’s performance. Each region has its own Elasticsearch instance. Zeebe is exporting data to both instances and provides data replication.

We recommend the approach of one Elasticsearch per region and configuring Zeebe to export the Elasticsearch data to both regions.

#### Operate and Tasklist

These Components are **active-passive** components and, in their current state, are not highly available. These Components are limited by the included exporters that would cause data issues when running multiple instances at the same time.

Only a single Component instance can run in each region (for example, in Region 0, there is 1 instance of Operate and 1 instance of Tasklist; the same is true in Region 1).

One instance must be actively serving traffic while the other is on standby.

Operate and Tasklist store some data in the active region, as they write directly to Elasticsearch, and this data is not replicated through Zeebe. In the event of a total active region loss, the following data loss will occur:

- Operate Losses: Uncompleted batch operations
- Tasklist Losses: Task assignments

## Requirements and limitations

### Installation environment

Two Kubernetes clusters are required for the Helm chart installation.

Amazon OpenSearch is **not supported** in dual-region configurations.

#### Network requirements

- Kubernetes clusters, services, and pods must not have overlapping CIDRs. Each cluster must use distinct CIDRs that do not conflict or overlap with those of any other cluster to avoid routing issues.
- The regions (for example, two Kubernetes clusters) must be able to communicate with each other (for example, via VPC peering). See [example implementation](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md) for AWS EKS.
  - Kubernetes services in one cluster must be resolvable and reachable from the other cluster and vice-versa. This is essential for proper communication and functionality across regions:
    - For AWS EKS setups, ensure DNS chaining is configured. Refer to the [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md).
    - For OpenShift, [Submariner](https://docs.redhat.com/en/documentation/red_hat_advanced_cluster_management_for_kubernetes/2.11/html/networking/networking#submariner) is recommended for handling multi-cluster networking. Refer to the [OpenShift dual-region setup guide](/self-managed/setup/deploy/openshift/dual-region.md).
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
  esponsible for detecting regional failures and executing the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md).

### Camunda 8 dual-region limitations

| **Aspect**                     | **Details**                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods           | <p><ul><li>For **Kubernetes** we recommend using a dual-region Kubernetes setup with the [Camunda Helm chart](/self-managed/setup/install.md) installed in two Kubernetes clusters.</li><li>For **other platforms**, using alternative installation methods (for example, with docker-compose) is not covered by our guides.</li></ul></p>                                                                                                                                              |
| Camunda Platform Configuration | <p>The overall Camunda platform is **active-passive**</p><p><ul><li>**Active-Passive Traffic Handling:** One active and one passive region serve active user traffic.</li><li>**Traffic to Both Regions:** Serving traffic to both regions will cause component detachment, potentially resulting in different data visibility in Operate and Tasklist.</li></ul></p>                                                                                                                   |
| Identity Support               | Identity, including multi-tenancy and Role-Based Access Control (RBAC), is currently unavailable in this setup.                                                                                                                                                                                                                                                                                                                                                                         |
| Optimize Support               | Not supported (requires Identity).                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Connectors Deployment          | Connectors can be deployed in a dual-region setup, but attention to [idempotency](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event) is required to avoid event duplication. In a dual-region setup, you'll have two connector deployments and using message idempotency is of importance to not duplicate events.                                                                                                                                  |
| Connectors                     | If you are running Connectors and have a process with an inbound connector deployed in a dual-region setup, consider the following: <ul><li> when you want to delete the process deployment, delete it via Operate (not zbctl), otherwise the inbound connector won't deregister.</li><li>if you have multiple Operate instances running, then perform the delete operation in both instances. This is a [known limitation](https://github.com/camunda/camunda/issues/17762).</li></ul> |
| Zeebe Cluster Scaling          | Not supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Web Modeler                    | Web Modeler is a standalone component that is not covered in this guide. Modelling applications can operate independently outside of the orchestration clusters.                                                                                                                                                                                                                                                                                                                        |

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

In a dual-region setup, a loss of a region will invariably affect Camunda 8, regardless of whether it's the active or passive region.

This means the Zeebe stretch cluster will not have a quorum when half of its brokers are not reachable anymore and will stop processing any new data. This will also affect the components, as they cannot update or push new workflows. Essentially, this means the workflow engine will halt until the region failover procedure is complete.

The [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) looks in detail at a recovery from a region loss and how to long-term fully re-establish the lost region.

:::caution
Customers are expected to proactively monitor for regional failures and take ownership of executing the necessary [operational procedures](./../../operational-guides/multi-region/dual-region-ops.md) to ensure smooth recovery and failover.
:::

### Active region loss

The total loss of the active region results in the following:

- **Service disruption**: Traffic routed to the active region can no longer be served.
- **Workflow engine impact**: The workflow engine stops processing due to quorum loss.
- **Loss of Tasklist and Operate operations**: Uncompleted batch operations and Tasklist assignments will be lost

#### Steps to take in case of active region loss

1. **Temporary recovery:** Follow the [operational procedure for temporary recovery](./../../operational-guides/multi-region/dual-region-ops.md#failover) to restore functionality and unblock the workflow engine.
2. **Traffic rerouting:** Reroute traffic to the passive region, which will now become the new active region.
3. **Data and task management:** Due to the loss of data in Operate and Tasklist:
   1. Reassign any uncompleted tasks in the lost region's Tasklist.
   2. Recreate batch operations in Operate.
4. **Permanent region setup:** In case of permanent/complete region loss, follow the [operational procedure to create a new permanent region](./../../operational-guides/multi-region/dual-region-ops.md#failback) that will become your new passive region.

### Passive region loss

The loss of the passive region results in the following:

- **Workflow engine impact**: The workflow engine will stop processing due to the loss of quorum.

#### Steps to take in case of passive region loss

1. **Temporary recovery:** Follow the [operational procedure to temporarily recover](./../../operational-guides/multi-region/dual-region-ops.md#failover) from the loss and unblock the workflow engine.
2. **Permanent region setup:** Follow the [operational procedure to create a new permanent region](./../../operational-guides/multi-region/dual-region-ops.md#failback) that will become your new passive region.

:::note
Unlike an active region loss, no data will be lost and no traffic rerouting is necessary.
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

- Familiarize yourself with our [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md). This showcases an example blueprint setup in AWS that utilizes the managed EKS and VPC peering for a dual-region setup with Terraform.
  - The concepts in the guide are mainly cloud-agnostic, and the guide can be adopted by other cloud providers.
- Familiarize yourself with the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
