---
id: dual-region
title: "Dual-Region"
sidebar_label: "Dual-Region"
description: "Dual-Region allows you to run Camunda Platform connected in two regions."
---

import DualRegion from "./img/dual-region.svg";

## Introduction

Camunda 8 is compatible with a dual-region setup under certain [limitations](#limitations). This allows Camunda 8 to run in a mix of active-active and active-passive setups, resulting in an overall **active-passive** setup. The following will explore the concept, limitations, and considerations.

You should get yourself familiar with the topic, the [limitations](#limitations) of Camunda 8 but also general [considerations](#considerations) on operating a dual-region setup.

## Disclaimer

:::danger

- Customers must develop and test operational procedures in non-production environments based on the framework steps outlined by Camunda.
- Before advancing to production go-live, customers need to validate these procedures with Camunda.

:::

## Architecture

<DualRegion />

The current architecture consists of the following supported components:

- Zeebe (Workflow Engine)
- Elasticsearch (Database)
- WebApps
  - Operate
  - Tasklist

Zeebe stretches across the regions due to its use of the [raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>) allowing it to communicate and replicate data between all brokers across. Zeebe is exporting data to two Elasticsearch instances, one in each region. Operate and Tasklist will import the previously exported data and run per region.

One of the regions will be considered **active** and the other one **passive**. User traffic must only reach the **active** region.

### Definitions

**Active-active** and **active-passive** are standard setups used in dual region configurations to ensure that applications remain available and operational in case of failures.

In an **active-active** setup, multiple application instances run simultaneously in different regions, actively handling user requests. This allows for better load balancing and fault tolerance, as traffic can spread across regions. If one region fails, the workload can shift to another without causing disruptions.

In contrast, an **active-passive** setup designates one region as the main or active region where all user requests are processed. The other region remains on standby until needed, only becoming active if the primary region fails. This setup is easier to manage but may result in higher delays during failover events.

### User traffic

The overall system is **active-passive**, even though some components may be **active-active**. You will have to take care of the user traffic routing or DNS by yourself, and won't be considered further. You must select one region as the actively serving region and route the user traffic there. In case of a total region failure, you must route the traffic to the passive region yourself.

<!-- Should we provide some reading materials on how to tackle this? -->

### Components

#### Zeebe ![active](https://img.shields.io/badge/active-green?style=for-the-badge)

Zeebe, as a workflow engine, is fully **active-active** and replicates data between its brokers. Due to its replication logic, it can handle an entire region failure without data loss. Requiring a proper partition and replication setup. Consider reading through the [cluster technical concept](./../../../components/zeebe/technical-concepts/clustering.md) to learn more about the [raft protocol](<https://en.wikipedia.org/wiki/Raft_(algorithm)>).

#### Elasticsearch ![passive](https://img.shields.io/badge/passive-orange?style=for-the-badge)

We treat Elasticsearch as an **active-passive** component. While it may be possible to deploy it in active-active mode and stretch across regions, it's not officially documented by Elasticsearch. Such a setup generally brings its own challenges along that we can't control and may negatively impact the performance of Zeebe.

We go with the approach of keeping an Elasticsearch per region and populating the data directly from the Zeebe exporter in each region.

#### WebApps ![passive](https://img.shields.io/badge/passive-orange?style=for-the-badge)

WebApps are an **active-passive** component and in its current state also not highly available since we're limited by the included exporters that would cause data issues when running multiple instances at the same time.

Per region, one WebApp instance is required for the exporter to run.

This means that one instance will be actively serving traffic, while the other one is on standby.

##### Operate

In the event of a total primary region loss, the following data will be lost:

- Batch Operations <!-- Do we have a docs link for this? -->

##### Tasklist

In the event of a total primary region loss, the following data will be lost:

- Assignments of tasks

## Requirements

- Camunda 8
  - Minimum [helm chart version](https://github.com/camunda/camunda-platform-helm) **9.3+**
  - Minimum component images
    - Elasticsearch **8.9+**
    - Operate **8.5+**
    - Tasklist **8.5+**
    - Zeebe **8.5+**
    - Zeebe Gateway **8.5+**
- Two connected Kubernetes clusters
- Maximum latency of 100ms between the two Kubernetes clusters
- Open Ports between the two Kubernetes clusters
  - **9200** for Elasticsearch since Zeebe has to push data cross region
  - **26500** for the Zeebe gateway from client/worker communication
  - **26501** for the Zeebe brokers and Zeebe gateway communication
  - **26502** for the Zeebe brokers and Zeebe gateway communication

## Limitations

- This is only about a dual-region setup and does not replicate any multi-region setup with more than two Kubernetes clusters
  - a multi-region setup of 3+ clusters will behave differently due to for example the raft protocol within Zeebe
- Camunda 8 must be installed with the [Camunda Helm chart](https://github.com/camunda/camunda-platform-helm)
  - a docker installation or plain JAR installation is not supported
- Looking at the whole Camunda Platform, it's **active-passive**, while some key components are active-active
  - meaning there's always one primary and one secondary region for serving active user traffic
  - serving traffic to both regions will result in a detachment of the WebApps and users seeing different results in Operate and Tasklist
- The user is responsible for detecting a regional failure and executing the [operational procedure](<-- TODO: link -->)
- Identity is not supported
  - Multi-tenancy does not work
  - Role Based Access Control (RBAC) does not work
  - the reasoning behind it is that Identity brings its own problems along that require more work on our side
    - those namely being a multi-region PostgreSQL database and aligning cluster secrets of identity to ensure RBAC works properly across regions
- Optimize is not supported
  - this is due to strict coupling with Identity
- Connectors are not supported
  - this is due to its coupling with Operate, which has a negative side effect on inbound connectors and can result in race conditions
- Only a maximum latency of 100 ms between the regions is supported
- Only specific combinations of Zeebe broker counts and replications factors are supported <!-- TODO: Maybe Deepthi can elaborate on this and how a customer can figure out a setup -->
- During the fallback procedure, there’s a small chance that some data will be lost for the WebApps
  - Due to the difference in sequence position tracking for exporters to different Elasticsearch locations <!-- TODO: Maybe for Deepthi to elaborate furthe r -->
- Zeebe automatic cluster scaling
  - consider the cluster to be static
- Web-Modeler is a standalone component and will not be considered further.
  - Modeling applications can operate independently outside of the automation clusters.
- Following topics are out of scope and have not yet been explored further and may or may not work well with the dual-region setup
  - managed OpenSearch usage
  - OpenShift support
  - Service meshes

<!-- TODO: Should there be a disclaimer on we're trying to improve the support of Identity, ... with the next version? -->

## Considerations

Multi-region setups in itself bring their own complexity:

- Managing multiple Kubernetes clusters and their deployments across regions
- Monitoring and alerting
- Increased costs of multiple clusters and cross-region traffic
- Data consistency and synchronization challenges
  - bursts of increased latency can already have an impact
- Managing DNS and incoming traffic

## Region loss

The loss of a region will invariably affect Camunda 8, regardless of whether it's the primary or secondary region.

It means in practice that Zeebe can not function if half its brokers are not reachable anymore and will stop processing any new data. This will also affect the WebApps since they can not update or push new workflows. Ultimately causing your workflow engine to halt until the region loss has been fixed one way or another.

The [operational procedure](<!-- TODO: link -->) looks in detail at how to temporarily recover from a region loss and ultimately how to fully reestablish the lost region.

## Guides

- Get yourself familiar with our [AWS setup guide](<!-- TODO: link -->) that showcases an example setup in AWS by utilizing the managed Elastic Kubernetes Service (EKS) and VPC peering for a dual-region setup with Terraform.
- Get yourself familiar with the [operational procedure](<!-- TODO: link -->) to understand how to proceed in the case of a total region loss and how to prepare yourself to ensure smooth operations.
