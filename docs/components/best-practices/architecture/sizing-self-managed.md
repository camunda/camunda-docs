---
id: sizing-self-managed
title: Self-Managed resource planning
tags:
  - Performance
  - Hardware
  - Sizing
  - Self-Managed
  - Kubernetes
description: "Plan resources for your Camunda 8 Self-Managed cluster with baseline configurations for CPU, memory, and disk, plus guidance on scaling and secondary storage options."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Provisioning Camunda 8 on your Self-Managed cluster depends on several factors. Use [Kubernetes with Helm](/self-managed/deployment/helm/index.md) to deploy and manage your Self-Managed cluster.

Use the configurations and guidance below as a baseline, then adjust based on your workload. For background on the factors that drive provisioning requirements, see [Size your environment](sizing-your-environment.md).

## Camunda 8.8+ resource consumption

Camunda 8.8 introduced a streamlined architecture that consolidates the broker, gateway, Operate, Tasklist, and Identity into a single application, the [Orchestration Cluster](/components/orchestration-cluster.md). This changes how you think about resource consumption compared to older versions.

If you are upgrading from a pre-8.8 version, expect different resource profiles:

- The Orchestration Cluster requires **more CPU per broker** compared to 8.7 (approximately 75% more CPU, for example, 2 to 3.5 cores, to maintain equivalent throughput).
- Throughput at the default 2 CPU cores drops ~35% compared to 8.7.x.
- With properly aligned resources (3.5 CPU cores), 8.8.x achieves similar throughput to 8.7.x with **significantly lower latency** (approximately a 2x improvement).
- The streamlined architecture reduces operational complexity (fewer pods to manage) but consolidates resource consumption into fewer, larger pods.

All components are clustered to provide high-availability, fault-tolerance, and resilience.

The Orchestration Cluster scales horizontally by adding more nodes (pods). This is limited by the [number of partitions](/components/zeebe/technical-concepts/partitions.md) configured for a cluster, as the work within one partition cannot be parallelized by design. Hence, you need to define enough partitions to utilize your hardware. The [number of partitions can be scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) after the cluster is initially provisioned, but not yet scaled down.

Camunda 8 runs on Kubernetes. Every component runs as a pod with assigned resources. These resources can be scaled vertically (assigned more or fewer resources dynamically) within certain limits. Vertical scaling does not always increase throughput, since the components depend on each other.

:::note
Camunda licensing does not depend on the provisioned hardware resources, making it easy to size according to your needs.
:::

## Baseline performance

With the [baseline resource configuration](#baseline-resource-configuration) below, you can expect the following performance. These numbers were measured using Camunda's [load test application](https://github.com/camunda/camunda/tree/main/load-tests/load-tester) with a [realistic reference process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) and [realistic payload](https://github.com/camunda/camunda/blob/main/zeebe/load-tests/project/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB). For details on the testing methodology, see the [reliability testing documentation](https://github.com/camunda/camunda/blob/main/docs/testing/reliability-testing.md).

The realistic reference process starts one root process instance, which spawns 50 sub-process instances via call activities. It covers a wide variety of BPMN elements, including call activities, multi-instance, sub-processes, and DMN. The process is based on the [Credit Card Fraud Dispute Handling](https://marketplace.camunda.com/en-US/apps/449510/credit-card-fraud-dispute-handling) blueprint from the Camunda Marketplace.

| Metric                                          | Value                                          |
| ----------------------------------------------- | ---------------------------------------------- |
| Completed process instances per second          | 51 (includes root and child process instances) |
| Completed flow node instances (FNIs) per second | 560                                            |
| Completed tasks per second                      | 100                                            |
| Data availability (query API latency)           | < 5 seconds                                    |

## Baseline resource configuration

<Tabs groupId="optimize" defaultValue="with-optimize" values={
[
{ label: 'Without Optimize', value: 'without-optimize', },
{ label: 'With Optimize', value: 'with-optimize', },
]}>

<TabItem value="without-optimize">

The following configuration provides a baseline equivalent to a 1x SaaS cluster without Optimize enabled.

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. The Orchestration Cluster CPU request of 3 cores reflects the 8.8 streamlined architecture. Confirm max throughput and max stored PI for this configuration. -->

| Component                 |                     | Request | Limit |
| ------------------------- | ------------------- | ------: | ----: |
| **Orchestration Cluster** |                     |         |       |
| Brokers                   | 3                   |         |       |
| Partitions                | 3                   |         |       |
| Replication factor        | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Memory \[GB\]       |       2 |     2 |
|                           | Disk \[GB\]         |         |   128 |
| **Connectors**            |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.2 |   0.2 |
|                           | Memory limit \[GB\] |   0.512 |     1 |
| **Elastic**               |                     |         |       |
| #statefulset              | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Memory limit \[GB\] |       2 |     2 |
|                           | Disk request \[GB\] |         |   128 |

</TabItem>

<TabItem value="with-optimize">

When Optimize is enabled, additional resources are needed, especially for Elasticsearch, because Optimize's importer reads from and writes to Elasticsearch indices. See [Impact of Optimize](sizing-your-environment.md#impact-of-optimize) for more details.

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. These numbers are based on the Optimize V2 experiment (minimum ES resources for realistic workload at 1 PI/s with 101 tasks/s). -->

| Component                 |                     | Request | Limit |
| ------------------------- | ------------------- | ------: | ----: |
| **Orchestration Cluster** |                     |         |       |
| Brokers                   | 3                   |         |       |
| Partitions                | 3                   |         |       |
| Replication factor        | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Memory \[GB\]       |       2 |     2 |
|                           | Disk \[GB\]         |         |   128 |
| **Connectors**            |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.2 |   0.2 |
|                           | Memory limit \[GB\] |   0.512 |     1 |
| **Optimize**              |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.6 |     2 |
|                           | Memory limit \[GB\] |       1 |     2 |
| **Elastic**               |                     |         |       |
| #statefulset              | 3                   |         |       |
|                           | vCPU \[cores\]      |       7 |     7 |
|                           | Memory limit \[GB\] |       6 |     8 |
|                           | Disk request \[GB\] |         |   512 |

:::note
The numbers in the tables were measured using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) with a [realistic payload](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB). To calculate day-based metrics, an equal distribution over 24 hours is assumed.
:::

</TabItem>

</Tabs>

## Scale your cluster

Once you have a baseline configuration running, you can scale in several ways:

### Horizontal scaling

Add more brokers and partitions to increase throughput capacity. Partitions can be [scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) but not down, so avoid over-provisioning.

When scaling horizontally, **secondary storage often becomes the limiting factor**. Adding brokers increases export volume to Elasticsearch/OpenSearch, if secondary storage isn't scaled accordingly, it will bottleneck overall throughput. See [Elasticsearch scaling](#elasticsearch-scaling) for guidance.

### Vertical scaling

Increase CPU and memory per broker. Note that there are **diminishing returns** due to component interdependencies. For example, Elasticsearch indexing speed can bottleneck broker throughput).

### Elasticsearch scaling

- **Memory:** Increase Elasticsearch memory to store more historical data without performance degradation.
- **Nodes:** Add Elasticsearch statefulset replicas for more IOPS and query throughput.
- **Disk:** Increase disk size based on your data retention requirements. With Optimize enabled and a realistic payload (~11 KB), Elasticsearch disk can fill rapidly (for example, 128 Gi in under 12 hours at 1 PI/s with 30-day retention).

## Secondary storage considerations

The resource tables above assume Elasticsearch as the secondary storage backend. If you are using a different backend:

- **OpenSearch:** Similar resource profile to Elasticsearch. The tables above generally apply.
- **RDBMS (PostgreSQL, available from 8.9):** Replace the Elasticsearch resource block with appropriately sized PostgreSQL resources. Adjust throughput expectations **downward by approximately 30%** compared to the Elasticsearch-based tables. Unlike Elasticsearch, RDBMS scales primarily **vertically** (a larger instance) rather than horizontally, so plan your initial sizing with more headroom, as adding capacity later is more disruptive.

:::note
Optimize is not supported with RDBMS. If you need Optimize, you must also run Elasticsearch alongside your RDBMS.
:::

See [Secondary storage](sizing-your-environment.md#secondary-storage) for more details.

## Next steps

Validate your chosen configuration by [running your own benchmarks](sizing-benchmarks.md).
