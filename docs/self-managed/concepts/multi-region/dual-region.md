---
id: dual-region
title: "Dual-Region"
sidebar_label: "Dual-Region"
description: "Dual-Region allows you to run Camunda Platform connected in two regions."
---

import DualRegion from "./img/dual-region.svg";

## Introduction

Camunda 8 is compatible with a dual-region setup under certain [limitations](#limitations). This allows Camunda 8 to run in a mix of active-active and active-passive setups, resulting in an overall **active-passive** setup. The following will explore the concept, limitations, and considerations.

:::warning

You should get familiar with the topic, the [limitations](#limitations) of the dual-region setup, and the general [considerations](#considerations) on operating a dual-region setup.

:::

## Disclaimer

:::danger

- Customers must develop and test operational procedures in non-production environments based on the framework steps outlined by Camunda, **before applying them in production setups**.
- Before advancing to production go-live, customers need to validate these procedures with Camunda.

:::

## Architecture

<DualRegion />

The illustrated architecture consists of two regions. Each region houses a Kubernetes cluster in which Camunda 8 is deployed. Those two Kubernetes clusters are capable of communicating with each other.

The currently supported Camunda 8 components are the following:

- Zeebe (Workflow Engine)
- Elasticsearch (Database)
- WebApps
  - Operate
  - Tasklist

Zeebe stretches across the regions due to its use of the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>) allowing it to communicate and replicate data between all brokers across. Zeebe is exporting data to two Elasticsearch instances, one in each region. Operate and Tasklist will import the previously exported data and run per region.

One of the regions will be considered **active** and the other one **passive**. User traffic must only reach the **active** region. We consider **Region 0** to be the active region and **Region 1** to be the passive region. In our case, user traffic would only go to **Region 0**. **Region 1** would be considered passive and used in case of the loss of the active region. Due to Zeebe's active data replication, you can recover from an active region loss by utilizing the passive region without much downtime.

### Definitions

**Active-active** and **active-passive** are standard setups used in dual region configurations to ensure that applications remain available and operational in case of failures.

In an **active-active** setup, multiple application instances run simultaneously in different regions, actively handling user requests. This allows for better load balancing and fault tolerance, as traffic can spread across regions. If one region fails, the workload can shift to another without causing disruptions.

In contrast, an **active-passive** setup designates one region as the main or active region where all user requests are processed. The other region remains on standby until needed, only becoming active if the previously active region fails. This setup is easier to manage but may result in higher delays during failover events.

### User traffic

The overall system is **active-passive**, even though some components may be **active-active**. You will have to take care of the user traffic routing or DNS by yourself, and won't be considered further. You must select one region as the actively serving region and route the user traffic there. In case of a total region failure, you must route the traffic to the passive region yourself.

<!-- Should we provide some reading materials on how to tackle this? -->

### Components

#### Zeebe

Zeebe, as a workflow engine, is fully **active-active** and replicates data between its brokers. Due to its replication logic, it can handle an entire region failure without data loss. Requiring a proper partition and replication setup. Consider reading through the [cluster technical concept](./../../../components/zeebe/technical-concepts/clustering.md) to learn more about the [Raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>).

#### Elasticsearch

We treat Elasticsearch as an **active-passive** component. While it may be possible to deploy it in active-active mode and stretch across regions, it's not officially documented by Elasticsearch. Such a setup generally brings its own challenges along that we can't control and may negatively impact the performance of Zeebe.

We go with the approach of having one Elasticsearch per region and configuring Zeebe to export the Elasticsearch data in both regions.

#### WebApps

WebApps are an **active-passive** component and in its current state also not highly available since we're limited by the included exporters that would cause data issues when running multiple instances at the same time.

In every region, there can be only a single WebApp instance running (i.e. in Region 0, 1 instance of Operate, 1 instance of Tasklist; same in Region 1)

This means that one instance will be actively serving traffic, while the other one is on standby.

##### Operate

In the event of a total active region loss, the following data will be lost:

- Batch Operations <!-- Do we have a docs link for this? -->

##### Tasklist

In the event of a total active region loss, the following data will be lost:

- Assignments of tasks

## Requirements

- Camunda 8
  - Minimum [Helm chart version](https://github.com/camunda/camunda-platform-helm) **9.3+**
  - Minimum component images
    - Elasticsearch **8.9+**
    - Operate **8.5+**
    - Tasklist **8.5+**
    - Zeebe **8.5+**
    - Zeebe Gateway **8.5+**
- Two Kubernetes clusters
  - OpenShift is not supported
  - those need to be able to contact each other via, for example, VPC peering or similar means
  - an [example implementation](<!-- TODO: Link -->) of two VPC peered Kubernetes clusters based on AWS EKS
- Elasticsearch usage
  - OpenSearch (both managed and self-managed) is not supported
- Maximum RTT (round trip time) of 100 ms between the two Kubernetes clusters
- Open Ports between the two Kubernetes clusters
  - **9200** for Elasticsearch since Zeebe has to push data cross-region
  - **26500** for the Zeebe gateway from client/worker communication
  - **26501** for the Zeebe brokers and Zeebe gateway communication
  - **26502** for the Zeebe brokers and Zeebe gateway communication
- Only specific combinations of Zeebe broker counts and replication factors are supported
  - for example ... <!-- TODO: Maybe Deepthi can elaborate on this and how a customer can figure out a setup -->

## Limitations

- Camunda 8 must be installed with the [Camunda Helm chart](https://github.com/camunda/camunda-platform-helm)
  - alternative installation methods (for example with docker-compose installation) are not supported
- Looking at the whole Camunda Platform, it's **active-passive**, while some key components are active-active
  - meaning there's always one active and one passive region for serving active user traffic
  - serving traffic to both regions will result in a detachment of the WebApps and users potentially observing different data in Operate and Tasklist
- The customers operating their Camunda 8 setup are responsible for detecting a regional failure and executing the [operational procedure](<-- TODO: link -->)
- Identity is not supported
  - Multi-tenancy does not work
  - Role Based Access Control (RBAC) does not work
- Optimize is not supported
  - This is due to Optimize depending on Identity to work
- Connectors are not supported
  - This is due to Connectors depending on Operate to work for inbound connectors and potentially resulting in race condition
- During the fallback procedure, there’s a small chance that some data will be lost for the WebApps
  - Due to the difference in sequence position tracking for exporters to different Elasticsearch locations <!-- TODO: Maybe for Deepthi to elaborate furthe r -->
- Zeebe cluster scaling must be disabled
  - Zeebe cluster size (broker count) must be static in size
- Web-Modeler is a standalone component and is not covered in this guide
  - Modeling applications can operate independently outside of the automation clusters.
- Service meshes are presently unsupported, and we advise against their use for the setup.

## Considerations

Multi-region setups in itself bring their own complexity. The following items are such complexities and are not considered in our guides.
You should familiarize yourself with those before deciding to go for a dual-region setup.

- Managing multiple Kubernetes clusters and their deployments across regions
- Monitoring and alerting
- Increased costs of multiple clusters and cross-region traffic
- Data consistency and synchronization challenges (for example brought in by the increased latency)
  - bursts of increased latency can already have an impact
- Managing DNS and incoming traffic

## Region Loss

In a dual-region setup, a loss of a region will invariably affect Camunda 8, regardless of whether it's the active or passive region.

It means that the Zeebe stretch cluster will not have a quorum when half its brokers are not reachable anymore and will stop processing any new data. This will also affect the WebApps since they can not update or push new workflows. Essentially, this means that the workflow engine to halt until the region failover procedure is completed.

The [operational procedure](<!-- TODO: link -->) looks in detail at how to temporarily recover from a region loss and ultimately how to fully reestablish the lost region. The procedure works the same way for active or passive region loss since we don't consider traffic routing (DNS) in the scenario.

### Active Region Loss

The loss of the active region means:

- The loss of previously mentioned data in Operate and Tasklist
- Traffic is routed to the active region, which now can't be served anymore
- The workflow engine will stop processing due to the loss of the quorum

Looking at it from a high-level point of view, the following should be considered:

- Follow the [operational procedure](<!-- TODO: Link -->) to temporarily recover from the region loss and unblock the workflow engine
- Reroute traffic to the passive region that will now become the new active region
- Due to the loss of data in Operate and Tasklist, you'll have to:
  - reassign tasks in Tasklist
  - recreate batch operations in Operate
- Follow the [operational procedure](<!-- TODO: Link -->) to recreate a new permanent region that will become your new passive region

### Passive Region Loss

The loss of the passive region means:

- The workflow engine will stop processing due to the loss of the quorum

Looking at it from a high-level point of view, the following should be considered:

- Follow the [operational procedure](<!-- TODO: Link -->) to temporarily recover from the region loss and unblock the workflow engine
- Follow the [operational procedure](<!-- TODO: Link -->) to recreate a new permanent region that will become your new passive region

Unlike the active region loss, no data will be lost, nor will any traffic require rerouting.

## Guides

- Get yourself familiar with our [AWS setup guide](<!-- TODO: link -->) that showcases an example setup in AWS by utilizing the managed Elastic Kubernetes Service (EKS) and VPC peering for a dual-region setup with Terraform.
- Get yourself familiar with the [operational procedure](<!-- TODO: link -->) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
