---
id: sizing-self-managed
title: Self-Managed resource planning
tags:
  - Performance
  - Hardware
  - Sizing
  - Self-Managed
  - Kubernetes
description: "Configure your Camunda 8 Self-Managed Kubernetes cluster using these baseline resource settings, along with scaling and secondary storage guidance, to match your workload and sizing requirements."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Configure your Camunda 8 Self-Managed Kubernetes cluster using these baseline resource settings, along with scaling and secondary storage guidance, to match your workload and sizing requirements.

## About

Provisioning Camunda 8 on your Self-Managed Kubernetes cluster depends on several factors. For example, many customers already have teams that provide Elasticsearch as a service.

Use the configurations and guidance below as a baseline, then adjust based on your workload. For background on the factors that drive provisioning requirements, see [Size your environment](sizing-your-environment.md).

## Baseline resource configuration

<Tabs groupId="optimize" defaultValue="with-optimize" values={
[
{ label: 'Without Optimize', value: 'without-optimize', },
{ label: 'With Optimize', value: 'with-optimize', },
]}>

<TabItem value="without-optimize">

The following configuration provides a baseline equivalent to a 1x SaaS cluster without Optimize enabled.

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. The Orchestration Cluster CPU request of 3 cores reflects the 8.8 streamlined architecture. Confirm max throughput and max stored PI for this configuration. -->

| Component                 |                     |                                                                    Request |         Limit |
| ------------------------- | ------------------- | -------------------------------------------------------------------------: | ------------: |
| **Orchestration Cluster** |                     |                                                                            |               |
| Brokers                   | 3                   |                                                                            |               |
| Partitions                | 3                   |                                                                            |               |
| Replication factor        | 3                   |                                                                            |               |
|                           | vCPU \[cores\]      |                                                                          3 |             3 |
|                           | Memory \[GB\]       |                                                                          2 |             2 |
|                           | Disk \[GB\]         |                                                                         32 |           128 |
| **Connectors**            |                     |                                                                            |               |
| #                         | 1                   |                                                                            |               |
|                           | vCPU \[cores\]      |                                                                        0.2 |           0.2 |
|                           | Memory limit \[GB\] |                                                                      0.512 |             1 |
| **Elastic**               |                     |                                                                            |               |
| #statefulset              | 3                   |                                                                            |               |
|                           | vCPU \[cores\]      |    <!-- TODO: Fill in ES CPU request/limit for without-Optimize config --> | <!-- TODO --> |
|                           | Memory limit \[GB\] | <!-- TODO: Fill in ES memory request/limit for without-Optimize config --> | <!-- TODO --> |
|                           | Disk request \[GB\] |                                                                         32 |           128 |

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
|                           | Disk \[GB\]         |      32 |   128 |
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
|                           | Disk request \[GB\] |      32 |   512 |

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

:::important
Always benchmark after vertical scaling changes.
:::

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
