---
id: dual-region
title: "Dual-region"
sidebar_label: "Dual-region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.svg";

Camunda 8 is compatible with a dual-region setup under certain [limitations](#limitations). This configuration allows Camunda 8 to run in a mix of active-active and active-passive setups, resulting in an overall **active-passive** setup. The following article will explore the concept, limitations, and considerations.

:::warning

You should get familiar with the topic, the [limitations](#limitations) of the dual-region setup, and the general [considerations](#considerations) on operating a dual-region setup.

:::

## Active-active and active-passive

**Active-active** and **active-passive** are two common configurations used in multi-region setups to ensure application availability and reliability in case of failures.

In an **active-active** setup, multiple instances of the application run simultaneously in different regions, each actively handling user requests. This setup improves load balancing and fault tolerance by distributing traffic across regions. If one region fails, its workload is automatically redirected to the others, minimizing disruptions.

By contrast, an **active-passive** configuration designates one region as the primary, handling all user traffic. The secondary region remains on standby and only takes over if the primary region fails. While easier to manage, this setup can lead to higher delays during failover.

## Architecture

<DualRegion />

This architecture consists of two regions hosting a Kubernetes cluster with a Camunda 8 deployment. For illustration, a Kubernetes-based setup is shown, where both Camunda 8 deployments can communicate with each other.

One region is designated as **active** and the other as **passive**. User traffic is directed exclusively to the **active** region. In the diagram, **Region 0** (highlighted in green) is the **active** region, while **Region 1** is **passive**. Traffic flows to ** Region 0** under normal conditions, with **Region 1** standing by to take over if the **active** region fails. Thanks to Zeebe’s data replication, the **passive** region can be quickly recovered and can resume operations, minimizing downtime in the event of a failure.

Zeebe stretches across the regions using the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), enabling data communication and replication between all brokers. Data is exported to two separate Elasticsearch instances, one in each region, allowing Operate and Tasklist to import previously exported data and operate independently within each region.

The currently supported Camunda 8 Self-Managed components are:

- Zeebe (workflow engine)
- Elasticsearch (database)
- Operate
- Tasklist

### User traffic

The overall system is classified as **active-passive**, even though some components may be **active-active**. Managing user traffic routing or DNS is outside this architecture's scope and must be handled separately. You must configure your network infrastructure to direct traffic to the **active** region. In the event of a total region failure, it’s essential to develop operational procedures to reroute traffic to the **passive** region.

### Components

#### Zeebe

Zeebe, as a workflow engine, is fully **active-active** and replicates data between its brokers. Due to its replication logic, it can handle an entire region failure without data loss but requires a proper partition and replication setup. Consider reading through the [cluster technical concept](./../../../components/zeebe/technical-concepts/clustering.md) to learn more about the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>).

#### Elasticsearch

This architecture, **Elasticsearch** is treated as an **active-passive** component. Although it is technically possible to configure Elasticsearch in an **active-active** setup across regions, Elasticsearch does not officially support or document this approach. Attempting to stretch Elasticsearch across multiple regions introduces complexities that can negatively impact performance, particularly in relation to **Zeebe**.

We recommend deploying a separate **Elasticsearch** instance in each region for optimal performance and simplicity. **Zeebe** should be configured to export data to both Elasticsearch instances, ensuring data availability in each region without introducing the challenges of a multi-region active-active setup. This configuration maintains reliability while minimizing potential performance issues.

#### Operate and Tasklist

The **Camunda Operate and Tasklist** in this architecture are configured as **active-passive**, meaning they are not inherently highly available. This limitation stems from the data exporters used by these components, which can cause data inconsistencies when multiple instances run simultaneously.

Only a single instance of each component can be active at any given time in each region. For example, in **Region 0**, there would be one active instance of **Operate** and one active instance of **Tasklist**; the same applies to **Region 1**. This setup ensures that one instance per component is actively serving traffic while the corresponding instance in the other region remains on standby, ready to take over in case of failure.

This active-passive configuration ensures data consistency but also requires careful management of failover procedures to ensure smooth transitions between regions.

## Requirements

- Camunda 8
  - Minimum component images
    - Elasticsearch **8.9+**
      - OpenSearch (both managed and self-managed) is not supported
    - Operate **8.5+**
    - Tasklist **8.5+**
    - Zeebe **8.5+**
    - Zeebe Gateway **8.5+**
- For the Helm chart installation method, two Kubernetes clusters are required
- Network
  - The regions (for example, two Kubernetes clusters) need to be able to connect to each other (for example, via VPC peering)
    - See an [example implementation](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md) of two VPC-peered Kubernetes clusters based on AWS EKS.
  - Maximum network round trip time (**RTT**) between the regions should not exceed **100 ms**
  - Open ports between the two regions:
    - **9200** for Elasticsearch for Zeebe to push data cross-region
    - **26500** for communication to the Zeebe Gateway from clients/workers
    - **26501** for the Zeebe brokers and Zeebe Gateway communication
    - **26502** for the Zeebe brokers and Zeebe Gateway communication
  - Cluster communication
    - Kubernetes services in one cluster must be resolvable and reachable from the other cluster and vice-versa. This is essential for proper communication and functionality across regions:
      - For AWS EKS setups, ensure DNS chaining is configured. Refer to the [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md).
      - For OpenShift, [Submariner](https://docs.redhat.com/en/documentation/red_hat_advanced_cluster_management_for_kubernetes/2.11/html/networking/networking#submariner) is recommended for handling multi-cluster networking. Specific implementation guides are not yet available.
- Only specific combinations of Zeebe broker counts and replication factors are supported
  - `clusterSize` must be a multiple of **2** and a minimum of **4** to distribute the brokers evenly across the two regions.
  - `replicationFactor` must be **4** to ensure that the partitions are evenly distributed across the two regions.
  - `partitionCount` is not restricted and depends on your workload requirements. Consider looking at [understanding sizing and scalability behavior](../../../components/best-practices/architecture/sizing-your-environment.md#understanding-sizing-and-scalability-behavior).
    - For further information and visualization of the partition distribution, consider consulting the documentation on [partitions](../../../components/zeebe/technical-concepts/partitions.md).
- The customers operating their Camunda 8 setup are responsible for detecting a regional failure and executing the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md).

## Limitations

- We recommend using a Kubernetes dual-region setup, with [Camunda Helm chart](/self-managed/setup/install.md) installed in two Kubernetes clusters.
  - Our documentation does not cover alternative installation methods (for example, docker-compose).
- Looking at the whole Camunda platform, it's **active-passive**, while some key components are active-active.
  - There's always one active and one passive region for serving active user traffic.
- Traffic must be routed to the **active** region only. Serving traffic to both regions will detach the components and cause data consistency issues with Operate and Tasklist.
- Identity is not supported.
  - Multi-tenancy is not supported in multi-region configuration.
  - Role-Based Access Control (RBAC) is not supported in multi-region configuration.
- Optimize is not supported due to dependency on Identity.
- Connectors can be deployed alongside each cluster, but ensure an understanding of idempotency based on [the described documentation](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event).
  - In a dual-region setup, you'll have two connector deployments, and using message idempotency is important to prevent event duplication.
- Zeebe cluster scaling is not supported.
- Web-Modeler is a standalone management component and is not covered in this guide.
  - Modeling applications can operate independently outside of the automation clusters.

## Considerations

Setting up a multi-region architecture introduces additional layers of complexity. The following challenges are common in multi-region environments but are not covered in our guides. Before opting for a dual-region setup, it’s important to understand and prepare for these complexities:

- **Managing Multiple Kubernetes Clusters**: Operating Kubernetes clusters across different regions requires careful coordination of deployments, configuration, and updates. You’ll need to ensure consistent setups and handle any region-specific nuances.
- **Monitoring and Alerting**: Monitoring becomes more complex with multiple regions. You must implement region-specific monitoring solutions to track performance, uptime, and failures. Alerting systems should be able to detect and respond to issues in each region separately.
- **Increased Costs**: Running multiple clusters in different regions increases infrastructure costs. This includes the cost of operating additional resources, managing cross-region traffic, and potentially higher data transfer fees.
- **Data Consistency and Synchronization**: Ensuring data consistency across regions can be challenging, especially when dealing with increased latency between regions. Synchronizing data efficiently and maintaining consistency, despite network delays or latency spikes, is crucial for smooth operation.
  - **Latency Bursts**: Even short bursts of increased latency can impact performance and cause synchronization issues between regions.
- **Managing DNS and Traffic Routing**: You must implement a robust DNS strategy to direct traffic to the appropriate region. Managing incoming traffic to ensure optimal performance and failover is critical to maintaining service availability.

These considerations highlight the complexities of multi-region deployments. Familiarizing yourself with these aspects will help ensure a smooth and efficient multi-region setup.

## Region Loss

In a dual-region setup, losing a region—whether active or passive—will significantly impact Camunda 8 operations.

When a region goes down, the **Zeebe stretch cluster** will lose half of its brokers, meaning it won’t have the quorum necessary to continue processing new data. Without a quorum, Zeebe will stop processing workflows, effectively halting the system. This also impacts other **Camunda components** like **Operate** and **Tasklist**, which depend on Zeebe to update or push new workflows. As a result, the entire workflow engine will be paused until the failover process is completed.

The [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) provides detailed guidance on handling short-term recovery from a region loss and the steps required for fully restoring the lost region in the long term. This recovery process applies equally to the loss of either the active or passive region, as traffic routing (DNS) is not factored into the region loss scenario.

Understanding this procedure is critical for minimizing downtime and restoring functionality after a region failure.

### Active region loss

The loss of the active region means:

- **Data Loss in Operate and Tasklist**: Any data or updates that were specific to the active region and not yet replicated to the passive region will be lost. Specifically:
  - Operate: Uncompleted batch operations
  - Tasklist: Task assignments
- **Interruption of User Traffic**: Traffic that was directed to the active region can no longer be served. Users will experience disruptions or errors as the system cannot handle requests directed to the lost region.
- **Workflow Engine Halt**: The workflow engine, dependent on a quorum of Zeebe brokers, will stop processing new workflows. Without a quorum, the system cannot function properly, leading to a complete halt in workflow execution until the failover process is complete.

The following high-level steps need to be taken in case of the active region loss:

1. Follow the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md#failover) to temporarily recover from the region loss and unblock the workflow engine.
2. Reroute traffic to the passive region that will now become the new active region.
3. Due to the loss of data in Operate and Tasklist, you'll have to:
   1. Reassign uncompleted tasks in the Tasklist.
   2. Recreate batch operations in Operate.
4. Follow the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md#failback) to recreate a new permanent region that will become your new passive region.

### Passive Region Loss

When the **passive region** is lost, the workflow engine will stop processing due to the loss of quorum. To resolve this, the following high-level steps must be taken:

1. **Temporary Recovery**: To unblock the workflow engine and temporarily recover from the region loss, follow the [operational failover procedure](./../../operational-guides/multi-region/dual-region-ops.md#failover).
2. **Permanent Recovery**: Create a new passive region to replace the lost one by following the [operational failback procedure](./../../operational-guides/multi-region/dual-region-ops.md#failback).

Unlike a loss of the active region, the loss of the passive region does not cause data loss or require traffic rerouting.

### Disaster Recovery

When assessing disaster recovery strategies, it's important to consider the **Recovery Point Objective (RPO)** and **Recovery Time Objective (RTO)** to gauge potential data loss and downtime.

- **Recovery Point Objective (RPO)**: Defines the maximum tolerable data loss measured in time. For **Operate**, **Tasklist**, and **Zeebe**, the **RPO** is **0**, meaning no data loss is acceptable.
- **Recovery Time Objective (RTO)**: Refers to the time needed to restore services to a functional state. For dual-region setups, the RTOs differ based on the recovery process:
  - **Failover**: Has an **RTO** of less than 1 minute to restore functionality, excluding DNS adjustments.
  - **Failback**: Has an **RTO** of **5 + X** minutes, where **X** is the time it takes to back up and restore **Elasticsearch**. The backup time varies based on the type of backup chosen, as outlined in [Elasticsearch's backup guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types).

During automated testing, reinstallation and reconfiguration of **Camunda 8** typically takes about 5 minutes. This serves as a general guideline, though actual times may vary based on your setup, resource availability, and experience with the operational procedure.

:::info
The RTO times mentioned are estimates and may vary depending on the specific environment and any manual steps involved.
:::

## Guides

To build a robust multi-region setup and safeguard your operations, make sure to review the following guides:

- Familiarize yourself with our [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md). This showcases an example blueprint setup in AWS using the managed EKS and VPC peering for a dual-region setup with Terraform.
  - The concepts in the guide are mainly cloud-agnostic, and the guide can be adopted by any other cloud provider.
- Familiarize yourself with the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
