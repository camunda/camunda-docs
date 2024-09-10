---
id: dual-region
title: "Dual-region"
sidebar_label: "Dual-region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.svg";

Camunda 8 is compatible with a dual-region setup under certain [limitations](#camunda-8-dual-region-limitations). This allows Camunda 8 to run in a mix of active-active and active-passive setups, resulting in an overall **active-passive** setup.

:::caution

Before implementing a dual-region setup, ensure you understand the topic, the [limitations](#camunda-8-dual-region-limitations) of dual-region setup, and the general [considerations](#platform-considerations) of operating a dual-region setup.

:::

## Active-active and active-passive

**Active-active** and **active-passive** are standard setups used in dual-region configurations to ensure that applications remain available and operational in case of failures.

- In an **active-active** setup, multiple application instances run simultaneously in different regions, actively handling user requests. This allows for better load balancing and fault tolerance, as traffic can spread across regions. If one region fails, the workload can shift to another without causing disruptions.

- By contrast, an **active-passive** setup designates one region as the main or active region where all user requests are processed. The other region remains on standby until needed, only becoming active if the previously active region fails. This setup is easier to manage but may result in higher delays during failover events.

## Disclaimer

:::danger

Running dual-region setups requires developing, testing, and executing custom [operational procedures](./../../operational-guides/multi-region/dual-region-ops.md) matching your environments. This page outlines key points to consider.

:::

## Architecture

<DualRegion />

The depicted architecture consists of two regions. For illustrative purposes, we're showing a Kubernetes-based installation. Each region houses a Kubernetes cluster with Camunda 8 deployment. Those two Camunda 8 setups are able to communicate with each other.

One of the regions will be considered **active** and the other **passive**. User traffic must only reach the **active** region. We consider **Region 0** (underlined in green) the active region and **Region 1** the passive region. In this case, user traffic would only go to **Region 0**. **Region 1** would be considered passive and used in case of the loss of the active region. Due to Zeebe's data replication, you can recover from an active region loss by utilizing the passive region without much downtime.

Zeebe stretches across the regions due to its use of the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), allowing it to communicate and replicate data between all brokers. Zeebe exports data to two Elasticsearch instances, one in each region. Operate and Tasklist will import the previously exported data and run per region.

The currently supported Camunda 8 Self-Managed components are:

- Zeebe (workflow engine)
- Elasticsearch (database)
- Operate
- Tasklist

### User traffic

The overall system is **active-passive**, even though some components may be **active-active**. You will have to take care of the user traffic routing or DNS by yourself, and won't be considered further. Select one region as the actively serving region and route the user traffic there. In case of a total region failure, route the traffic to the passive region yourself.

### Components

#### Zeebe

Zeebe, as a workflow engine, is fully **active-active** and replicates data between its brokers. Due to its replication logic, it can handle an entire region failure without data loss, but requires a proper partition and replication setup. Consider reading through the [cluster technical concept](./../../../components/zeebe/technical-concepts/clustering.md) to learn more about the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>).

#### Elasticsearch

We treat Elasticsearch as an **active-passive** component. While it may be possible to deploy it in active-active mode and stretch across regions, it's not officially documented by Elasticsearch. Such a setup generally brings its own challenges we can't control and may negatively impact the performance of Zeebe.

We recommend the approach of one Elasticsearch per region and configuring Zeebe to export the Elasticsearch data in both regions.

#### Components

Camunda components are **active-passive** components and in their current state not highly available as we're limited by the included exporters that would cause data issues when running multiple instances at the same time.

In every region, there can be only a single component instance running (for example in Region 0, 1 instance of Operate, 1 instance of Tasklist; same in Region 1).

This means that one instance will be actively serving traffic, while the other is on standby.

##### Operate

In the event of a total active region loss, the following data will be lost:

- Uncompleted batch operations

##### Tasklist

In the event of a total active region loss, the following data will be lost:

- Task assignments

## Requirements and Limitations

### Installation Environment

#### Kubernetes Setup

- Two Kubernetes clusters are required for the Helm chart installation.
- OpenSearch (both managed and self-managed) is not supported in this dual-region setup.

#### Network Requirements

- Kubernetes clusters, services, and pods must not have overlapping CIDRs. Each cluster must use distinct CIDRs that do not conflict or overlap with those of any other cluster; otherwise, you will encounter routing issues.
- The regions (for example, two Kubernetes clusters) must be able to connect to each other (for example, via VPC peering). See [example implementation](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md) for AWS EKS.
  - Kubernetes services in one cluster must be resolvable and reachable from the other cluster and vice-versa. This is essential for proper communication and functionality across regions:
    - For AWS EKS setups, ensure DNS chaining is configured. Refer to the [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md).
    - For OpenShift, [Submariner](https://docs.redhat.com/en/documentation/red_hat_advanced_cluster_management_for_kubernetes/2.11/html/networking/networking#submariner) is recommended for handling multi-cluster networking. Specific implementation guides are not yet available.
- Maximum network round trip time (**RTT**) between regions should not exceed **100 ms**.
- Required open ports between the two regions:
  - **9200** for Elasticsearch (for cross-region data push by Zeebe).
  - **26500** for communication to the Zeebe Gateway from clients/workers.
  - **26501** and **26502** for communication between Zeebe brokers and Zeebe Gateway.

### Zeebe Cluster Configuration

Only a combination for Zeebe broker counts and replication factors is supported:

- `clusterSize` must be a multiple of **2** and at least **4** to evenly distribute brokers across the two regions.
- `replicationFactor` must be **4** to ensure even partition distribution across regions.
- `partitionCount` is unrestricted but should be chosen based on workload requirements. See [understanding sizing and scalability behavior](../../../components/best-practices/architecture/sizing-your-environment.md#understanding-sizing-and-scalability-behavior).
- For more details on partition distribution, see [documentation on partitions](../../../components/zeebe/technical-concepts/partitions.md).

### Regional Failure Management

Customers are responsible for detecting regional failures and executing the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md).

### Camunda 8 dual-region limitations

| **Aspect**                     | **Details**                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installation methods           | <p><ul><li>For **kubernetes** we recommend using a dual-region Kubernetes setup with the [Camunda Helm chart](/self-managed/setup/install.md) installed in two Kubernetes clusters.</li><li>For **other platforms**, using alternative installation methods (for example, with docker-compose) is not covered in this guide.</li></ul></p>                                                                             |
| Camunda Platform Configuration | <p>The overall Camunda platform is **active-passive**, although some key components are active-active.</p><p><ul><li>**Active-Passive Traffic Handling:** One active and one passive region serve active user traffic.</li><li>**Traffic to Both Regions:** Serving traffic to both regions will cause component detachment, potentially resulting in different data visibility in Operate and Tasklist.</li></ul></p> |
| Identity Support               | Identity is not supported, multi-Tenancy and Role-Based Access Control (RBAC) does not work.                                                                                                                                                                                                                                                                                                                           |
| Optimize Support               | Not supported (requires Identity).                                                                                                                                                                                                                                                                                                                                                                                     |
| Connectors Deployment          | Connectors can be deployed in a dual-region setup, but attention to [idempotency](../../../components/connectors/use-connectors/inbound.md#creating-the-connector-event) is required to avoid event duplication. In a dual-region setup, you'll have two connector deployments and using message idempotency is of importance to not duplicate events.                                                                 |
| Zeebe Cluster Scaling          | Not supported.                                                                                                                                                                                                                                                                                                                                                                                                         |
| Web-Modeler                    | Is a standalone component not covered in this guide. Modeling applications can operate independently outside of the automation clusters.                                                                                                                                                                                                                                                                               |

### Platform considerations

:::caution
Multi-region setups have inherent complexities you should familiarize yourself with before choosing a dual-region setup.
:::

For example, consider the following complexities (not covered in our guides):

- Managing multiple Kubernetes clusters and their deployments across regions.
- Monitoring and alerting.
- Increased costs of multiple clusters and cross-region traffic.
- Data consistency and synchronization challenges (for example, brought in by the increased latency).
  - Bursts of increased latency can already have an impact.
- Managing DNS and incoming traffic.

## Region loss

In a dual-region setup, a loss of a region will invariably affect Camunda 8, regardless of whether it's the active or passive region.

This means the Zeebe stretch cluster will not have a quorum when half of its brokers are not reachable anymore and will stop processing any new data. This will also affect the components, as they cannot update or push new workflows. Essentially, this means the workflow engine will halt until the region failover procedure is complete.

The [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) looks in detail at short-term recovery from a region loss and how to long-term fully re-establish the lost region. The procedure works the same way for active or passive region loss since we don't consider traffic routing (DNS) in the scenario.

### Active region loss

The loss of the active region results in the following:

- **Loss of Data**: Data previously available in Operate and Tasklist is no longer accessible.
- **Service Disruption**: Traffic routed to the active region can no longer be served.
- **Workflow Engine Failure**: The workflow engine stops processing due to quorum loss.

#### Steps to take in case of active region loss

1. **Temporary Recovery:** Follow the [operational procedure for temporary recovery](./../../operational-guides/multi-region/dual-region-ops.md#failover) to restore functionality and unblock the workflow engine.
2. **Traffic Rerouting:** Reroute traffic to the passive region, which will now become the new active region.
3. **Data and Task Management:** Due to the loss of data in Operate and Tasklist:
   1. Reassign any uncompleted tasks in Tasklist.
   2. Recreate batch operations in Operate.
4. **Permanent Region Setup:** Follow the [operational procedure to create a new permanent region](./../../operational-guides/multi-region/dual-region-ops.md#failback) that will become your new passive region.

### Passive region loss

The loss of the passive region results in the following:

- **Workflow Engine Impact**: The workflow engine will stop processing due to the loss of quorum.

#### Steps to take in case of passive region loss

1. **Temporary Recovery:** Follow the [operational procedure to temporarily recover](./../../operational-guides/multi-region/dual-region-ops.md#failover) from the loss and unblock the workflow engine.
2. **Permanent Region Setup:** Follow the [operational procedure to create a new permanent region](./../../operational-guides/multi-region/dual-region-ops.md#failback) that will become your new passive region.

**Note:** Unlike an active region loss, no data will be lost and no traffic rerouting is necessary.

### Disaster Recovery

Based on all the limitations and requirements, you can consider the **Recovery Point Objective (RPO)** and **Recovery Time Objective (RTO)** in case of a disaster recovery to help with the risk assessment.

The **Recovery Point Objective (RPO)** is the maximum tolerable data loss measured in time.

The **Recovery Time Objective (RTO)** is the time to restore services to a functional state.

For Operate, Tasklist, and Zeebe the **RPO** is **0**.

The **RTO** can be considered for the **failover** and **failback** procedures, both resulting in a functional state.

- **failover** has an **RTO** of **< 1** minute to restore a functional state, excluding DNS considerations.
- **failback** has an **RTO** of **5 + X** minutes to restore a functional state, where X is the time it takes to back up and restore Elasticsearch. This timing is highly dependent on the setup and chosen [Elasticsearch backup type](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types).
  During our automated tests, the reinstallation and reconfiguration of Camunda 8 takes 5 minutes. This can serve as a general guideline for the time required, though your experience may vary depending on your available resources and familiarity with the operational procedure.

:::info

The described minutes for the **Recovery Time Objective** are estimated and may differ due to the manual steps involved.

:::

## Guides

- Familiarize yourself with our [Amazon Elastic Kubernetes Service (EKS) setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md). This showcases an example blueprint setup in AWS by utilizing the managed EKS and VPC peering for a dual-region setup with Terraform.
  - The concepts in the guide are mainly cloud-agnostic and the guide can be adopted to other cloud providers.
- Familiarize yourself with the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
