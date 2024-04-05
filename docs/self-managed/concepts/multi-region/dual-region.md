---
id: dual-region
title: "Dual region"
sidebar_label: "Dual region"
description: "A dual-region setup allows you to run Camunda in two regions synchronously."
---

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

import DualRegion from "./img/dual-region.svg";

Camunda 8 is compatible with a dual-region setup under certain [limitations](#limitations). This allows Camunda 8 to run in a mix of active-active and active-passive setups, resulting in an overall **active-passive** setup. The following will explore the concept, limitations, and considerations.

:::warning

You should get familiar with the topic, the [limitations](#limitations) of the dual-region setup, and the general [considerations](#considerations) on operating a dual-region setup.

:::

## Active-active and active-passive

**Active-active** and **active-passive** are standard setups used in dual region configurations to ensure that applications remain available and operational in case of failures.

In an **active-active** setup, multiple application instances run simultaneously in different regions, actively handling user requests. This allows for better load balancing and fault tolerance, as traffic can spread across regions. If one region fails, the workload can shift to another without causing disruptions.

By contrast, an **active-passive** setup designates one region as the main or active region where all user requests are processed. The other region remains on standby until needed, only becoming active if the previously active region fails. This setup is easier to manage but may result in higher delays during failover events.

## Disclaimer

:::danger

- Customers must develop and test [operational procedures](./../../operational-guides/multi-region/dual-region-ops.md) in non-production environments based on the framework steps outlined by Camunda **before applying them in production setups**.
- Before advancing to production go-live, validating these procedures with Camunda is strongly recommended.
- Customers are solely responsible for detecting any regional failures and implementing the necessary [operational procedures](./../../operational-guides/multi-region/dual-region-ops.md).

:::

## Architecture

<DualRegion />

The illustrated architecture consists of two regions. Each region houses a Kubernetes cluster in which Camunda 8 is deployed. Those two Kubernetes clusters are capable of communicating with each other.

One of the regions will be considered **active** and the other **passive**. User traffic must only reach the **active** region. We consider **Region 0** (underlined in green) the active region and **Region 1** the passive region. In this case, user traffic would only go to **Region 0**. **Region 1** would be considered passive and used in case of the loss of the active region. Due to Zeebe's data replication, you can recover from an active region loss by utilizing the passive region without much downtime.

Zeebe stretches across the regions due to its use of the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>), allowing it to communicate and replicate data between all brokers. Zeebe exports data to two Elasticsearch instances, one in each region. Operate and Tasklist will import the previously exported data and run per region.

The currently supported Camunda 8 Self-Managed components are:

- Zeebe (workflow engine)
- Elasticsearch (database)
- Operate
- Tasklist

### User traffic

The overall system is **active-passive**, even though some components may be **active-active**. You will have to take care of the user traffic routing or DNS by yourself, and won't be considered further. Select one region as the actively serving region and route the user traffic there. In case of a total region failure, route the traffic to the passive region yourself.

<!-- Should we provide some reading materials on how to tackle this? -->

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

- Assignments of uncompleted tasks

## Requirements

- Camunda 8
  - Minimum [Helm chart version](https://github.com/camunda/camunda-platform-helm) **9.3+**
  - Minimum component images
    - Elasticsearch **8.9+**
      - OpenSearch (both managed and self-managed) is not supported
    - Operate **8.5+**
    - Tasklist **8.5+**
    - Zeebe **8.5+**
    - Zeebe Gateway **8.5+**
- Two Kubernetes clusters
  - OpenShift is not supported
  - The Kubernetes clusters need to be able to connect to each other (for example, via VPC peering)
    - See an [example implementation](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md) of two VPC peered Kubernetes clusters based on AWS EKS.
  - Maximum round trip time (RTT) of 100ms between the two Kubernetes clusters
- Open ports between the two Kubernetes clusters
  - **9200** for Elasticsearch for Zeebe to push data cross-region
  - **26500** for communication to the Zeebe Gateway from client/workers
  - **26501** for the Zeebe brokers and Zeebe Gateway communication
  - **26502** for the Zeebe brokers and Zeebe Gateway communication
- Only specific combinations of Zeebe broker counts and replication factors are supported
  - `clusterSize` must be a multiple of **2** and a minimum of **4** to evenly distribute the brokers across the two regions.
  - `replicationFactor` must be **4** to ensure that the partitions are evenly distributed across the two regions.
  - `partitionCount` is not restricted and depends on your workload requirements, consider having a look at [understanding sizing and scalability behavior](../../../components/best-practices/architecture/sizing-your-environment.md#understanding-sizing-and-scalability-behavior).
    - For further information and visualization of the partition distribution, consider consulting the documentation on [partitions](../../../components/zeebe/technical-concepts/partitions.md).
- The customers operating their Camunda 8 setup are responsible for detecting a regional failure and executing the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md).

## Limitations

- Camunda 8 must be installed with the [Camunda Helm chart](../../platform-deployment/helm-kubernetes/overview.md#use-helm-to-install-on-kubernetes).
  - Alternative installation methods (with docker-compose installation, for example) are not supported.
- Looking at the whole Camunda platform, it's **active-passive**, while some key components are active-active.
  - There's always one active and one passive region for serving active user traffic.
  - Serving traffic to both regions will result in a detachment of the components and users potentially observing different data in Operate and Tasklist.
- Identity is not supported.
  - Multi-tenancy does not work.
  - Role Based Access Control (RBAC) does not work.
- Optimize is not supported.
  - This is due to Optimize depending on Identity to work.
- Connectors are not supported.
  - This is due to Connectors depending on Operate to work for inbound Connectors and potentially resulting in race condition.
- During the failback procedure, there’s a small chance that some data will be lost in Elasticsearch affecting Operate and Tasklist.
  - This **does not** affect the processing of process instances in any way. The impact is that some information about the affected instances might not be visible in Operate and Tasklist.
  - This is further explained in the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md?failback=step2#failback) during the relevant step.
- Zeebe cluster scaling is not supported.
- Web-Modeler is a standalone component and is not covered in this guide.
  - Modeling applications can operate independently outside of the automation clusters.
- Kubernetes service meshes are currently unsupported, and we advise against their use for the setup.

## Considerations

Multi-region setups in itself bring their own complexity. The following items are such complexities and are not considered in our guides.
You should familiarize yourself with those before deciding to go for a dual-region setup.

- Managing multiple Kubernetes clusters and their deployments across regions
- Monitoring and alerting
- Increased costs of multiple clusters and cross-region traffic
- Data consistency and synchronization challenges (for example, brought in by the increased latency)
  - Bursts of increased latency can already have an impact
- Managing DNS and incoming traffic

## Region loss

In a dual-region setup, a loss of a region will invariably affect Camunda 8, regardless of whether it's the active or passive region.

This means the Zeebe stretch cluster will not have a quorum when half of its brokers are not reachable anymore and will stop processing any new data. This will also affect the components, as they cannot update or push new workflows. Essentially, this means the workflow engine will halt until the region failover procedure is complete.

The [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) looks in detail at short-term recovery from a region loss and how to long-term fully re-establish the lost region. The procedure works the same way for active or passive region loss since we don't consider traffic routing (DNS) in the scenario.

### Active region loss

The loss of the active region means:

- The loss of previously mentioned data in Operate and Tasklist.
- Traffic is routed to the active region, which now can't be served anymore.
- The workflow engine will stop processing due to the loss of the quorum.

The following high-level steps need to be taken in case of the active region loss:

1. Follow the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md#failover) to temporarily recover from the region loss and unblock the workflow engine.
2. Reroute traffic to the passive region that will now become the new active region.
3. Due to the loss of data in Operate and Tasklist, you'll have to:
   1. Reassign uncompleted tasks in Tasklist.
   2. Recreate batch operations in Operate.
4. Follow the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md#failback) to recreate a new permanent region that will become your new passive region.

### Passive region loss

The loss of the passive region means the workflow engine will stop processing due to the loss of the quorum.

The following high-level steps need to be taken in case of passive region loss:

- Follow the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md#failover) to temporarily recover from the region loss and unblock the workflow engine.
- Follow the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md#failback) to recreate a new permanent region that will become your new passive region.

Unlike the active region loss, no data will be lost, nor will any traffic require rerouting.

### Disaster Recovery

Based on all the limitations and requirements, you can consider the **Recovery Point Objective (RPO)** and **Recovery Time Objective (RTO)** in case of a disaster recovery to help with the risk assessment.

The **Recovery Point Objective (RPO)** is the maximum tolerable data loss measured in time.

The **Recovery Time Objective (RTO)** is the time to restore services to a functional state.

For Zeebe the **RPO** is **0**.

For Operate and Tasklist the **RPO** is close to **0** for critical data due to the previously mentioned small chance of data loss in Elasticsearch during the failback procedure.

The **RTO** can be considered for the **failover** and **failback** procedures, both resulting in a functional state.

- **failover** has an **RTO** of **15-20** minutes to restore a functional state, excluding DNS considerations.
- **failback** has an **RTO** of **25-30 + X** minutes to restore a functional state. Where X is the time it takes to back up and restore Elasticsearch, which is highly dependent on the setup and chosen [Elasticsearch backup type](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types).

:::info

The described minutes for the **Recovery Time Objective** are estimated and may differ due to the manual steps involved.

:::

## Guides

- Familiarize yourself with our [AWS setup guide](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md) that showcases an example setup in AWS by utilizing the managed Elastic Kubernetes Service (EKS) and VPC peering for a dual-region setup with Terraform.
  - The concepts in the guide are mainly cloud-agnostic and the guide can be adopted to other cloud providers.
- Familiarize yourself with the [operational procedure](./../../operational-guides/multi-region/dual-region-ops.md) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.