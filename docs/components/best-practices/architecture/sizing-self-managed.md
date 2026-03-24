---
id: sizing-self-managed
title: Self-Managed resource planning
tags:
  - Performance
  - Hardware
  - Sizing
  - Self-Managed
  - Kubernetes
description: "Starting-point resource configurations for Camunda 8 Self-Managed on Kubernetes."
---

:::tip Audience
This page provides starting-point resource configurations for Camunda 8 Self-Managed on Kubernetes. For background on the factors that drive sizing, see [Sizing overview](sizing-your-environment.md).
:::

Provisioning Camunda 8 onto your Self-Managed Kubernetes cluster depends on various factors. For example, most customers already have their own teams providing Elasticsearch as a service.

The configurations below serve as starting points close to a 1x SaaS cluster. Use them as a baseline and adjust based on your workload. For guidance on what drives resource requirements, see the [Sizing overview](sizing-your-environment.md).

## Starting-point resource tables

### Without Optimize

The following configuration provides a starting point equivalent to a 1x SaaS cluster without Optimize enabled.

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. The Orchestration Cluster CPU request of 3 cores reflects the 8.8 streamlined architecture. Confirm max throughput and max stored PI for this configuration. -->

|                           |                     |                                                                    request |         limit |
| ------------------------- | ------------------- | -------------------------------------------------------------------------: | ------------: |
| **Orchestration cluster** |                     |                                                                            |               |
| \# brokers                | 3                   |                                                                            |               |
| \# partitions             | 3                   |                                                                            |               |
| replication factor        | 3                   |                                                                            |               |
|                           | vCPU \[cores\]      |                                                                          3 |             3 |
|                           | Mem \[GB\]          |                                                                          2 |             2 |
|                           | Disk \[GB\]         |                                                                         32 |           128 |
| **Connectors**            |                     |                                                                            |               |
| #                         | 1                   |                                                                            |               |
|                           | vCPU \[cores\]      |                                                                        0.2 |           0.2 |
|                           | Mem \[GB\] limit    |                                                                      0.512 |             1 |
| **Elastic**               |                     |                                                                            |               |
| #statefulset              | 3                   |                                                                            |               |
|                           | vCPU \[cores\]      |    <!-- TODO: Fill in ES CPU request/limit for without-Optimize config --> | <!-- TODO --> |
|                           | Mem \[GB\] limit    | <!-- TODO: Fill in ES memory request/limit for without-Optimize config --> | <!-- TODO --> |
|                           | Disk \[GB\] request |                                                                         32 |           128 |

### With Optimize

When Optimize is enabled, additional resources are needed — especially for Elasticsearch — due to Optimize's importer reading from and writing to ES indices. See [Impact of Optimize](sizing-your-environment.md#impact-of-optimize) for details.

:::note
The numbers in the tables were measured using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) with a [realistic payload](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB, containing a mix of BPMN symbols such as tasks, events, call activities, multi-instance, sub-processes, and DMN). To calculate day-based metrics, an equal distribution over 24 hours is assumed.
:::

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. These numbers are based on the Optimize V2 experiment (minimum ES resources for realistic workload at 1 PI/s with 101 tasks/s). -->

|                           |                     | request | limit |
| ------------------------- | ------------------- | ------: | ----: |
| **Orchestration cluster** |                     |         |       |
| \# brokers                | 3                   |         |       |
| \# partitions             | 3                   |         |       |
| replication factor        | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Mem \[GB\]          |       2 |     2 |
|                           | Disk \[GB\]         |      32 |   128 |
| **Connectors**            |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.2 |   0.2 |
|                           | Mem \[GB\] limit    |   0.512 |     1 |
| **Optimize**              |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.6 |     2 |
|                           | Mem \[GB\] limit    |       1 |     2 |
| **Elastic**               |                     |         |       |
| #statefulset              | 3                   |         |       |
|                           | vCPU \[cores\]      |       7 |     7 |
|                           | Mem \[GB\] limit    |       6 |     8 |
|                           | Disk \[GB\] request |      32 |   512 |

:::note
These configurations represent starting points. Your actual requirements depend on your throughput, payload size, retention settings, and whether you enable Optimize. Always validate with benchmarks for production workloads.
:::

## Scaling guidance

Once you have a baseline configuration running, you can scale in several directions:

### Horizontal scaling

Add more brokers and partitions to increase throughput capacity. Partitions can be scaled up but not down (see [cluster scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md)), so avoid over-provisioning.

When scaling horizontally, **secondary storage often becomes the limiting factor**. Adding brokers increases export volume to Elasticsearch/OpenSearch — if the secondary storage isn't scaled accordingly, it will bottleneck overall throughput. See [Elasticsearch scaling](#elasticsearch-scaling) for guidance.

### Vertical scaling

Increase CPU and memory per broker. Note that there are **diminishing returns** due to component interdependencies (e.g., Elasticsearch indexing speed can bottleneck broker throughput). Always benchmark after vertical scaling changes.

### Elasticsearch scaling

- **Memory:** Increase ES memory to store more historical data without performance degradation.
- **Nodes:** Add ES statefulset replicas for more IOPS and query throughput.
- **Disk:** Increase disk size based on your data retention requirements. With Optimize enabled and a realistic payload (~11 KB), ES disk can fill rapidly (e.g., 128 Gi in under 12 hours at 1 PI/s with 30-day retention).

## Secondary storage considerations

The resource tables above assume **Elasticsearch** as the secondary storage backend. If you are using a different backend:

- **OpenSearch:** Similar resource profile to Elasticsearch. The tables above generally apply.
- **RDBMS (PostgreSQL, available from 8.9):** Replace the Elasticsearch resource block with appropriately sized PostgreSQL resources. Adjust throughput expectations **downward by approximately 30%** compared to the Elasticsearch-based tables. Note that **Optimize is not supported with RDBMS** — if you need Optimize, you must also run Elasticsearch alongside your RDBMS. Unlike Elasticsearch, RDBMS scales primarily **vertically** (larger instance) rather than horizontally — plan your initial sizing with more headroom, as adding capacity later is more disruptive.

For more details on secondary storage options, see [Choosing your secondary storage](sizing-your-environment.md#choosing-your-secondary-storage).

## Next steps

To validate these configurations for your specific workload, see [Running benchmarks](sizing-benchmarks.md).
