---
id: sizing-your-environment
title: Size your environment
tags:
  - Database
  - Performance
  - Hardware
  - Sizing
description: "Understand the factors that influence Camunda 8 sizing. Once you understand those, use the sizing recommendations for [SaaS](sizing-saas.md) or [Self-Managed](sizing-self-managed.md) to select your appropriate configuration."
---

Understand the factors that influence Camunda 8 sizing. Once you understand those, use the sizing recommendations for [SaaS](sizing-saas.md) or [Self-Managed](sizing-self-managed.md) to select your appropriate configuration.

<!-- Anchors for backward compatibility with old single-page URLs -->
<span id="camunda-8-saas" />
<span id="camunda-8-self-managed" />
<span id="running-experiments-and-benchmarks" />

## Sizing influencing factors

### Data availability latency

Data availability latency is the time between an event occurring in the engine and it being queryable in Operate, Tasklist, or Optimize. Under heavy load or with Optimize enabled, this can lag from seconds to minutes.

Data availability latency is influenced by:

- **Exporter throughput:** The rate at which the Camunda Exporter can write events to Elasticsearch (ES).
- **Elasticsearch indexing speed:** How quickly ES can index incoming documents.
- **Elasticsearch disk usage:** High disk utilization (above ~70%) significantly increases indexing latency. Monitor ES disk usage and scale storage before hitting this threshold.

### Disk space

The workflow engine itself will store data along every process instance, especially to persist the current state. This is unavoidable. If your processes include user tasks, data is also sent to Tasklist and kept there until the tasks are completed.

In addition, data is sent to Operate and Optimize, which store it in ES. These tools keep historical audit data for the configured retention times.
You can reduce the total disk usage by adjusting data retention settings. Typically, Camunda deletes data in Operate after 30 to 90 days, but keep it in Optimize for a longer period to support analysis. A good rule of thumb is 6 to 18 months.

:::note
Elasticsearch needs enough available memory to load a large amount of this data into memory.
:::

:::important Disk space estimates are approximate
The kb/PI model below is a **rough approximation**. In practice, disk consumption depends on multiple factors and varies non-linearly:

- **Payload size:** A 0.5 KB payload vs. 11 KB payload can change disk consumption by 10-20x.
- **Flow node count per process:** More flow nodes mean more ES documents.
- **Variable cardinality:** Object variables with nested structures create exponentially more Elasticsearch nested documents.
- **Write amplification in Zeebe:** Compaction, WAL, and index overhead increase raw disk usage beyond the logical data size.

For non-trivial payloads (>1 KB) or long retention periods, **run your own disk space benchmarks** rather than relying solely on these estimates. See [Run benchmarks](sizing-benchmarks.md) for more details.
:::

<!-- TODO: Update disk space measurements for 8.8/8.9. The following numbers were measured with Camunda 8 SaaS 1.2.4 using the typical payload (~0.5 KB). They are significantly outdated and do not reflect current storage behavior, especially with the realistic payload (~11 KB). -->

The following approximate disk space measurements are taken using Camunda 8 SaaS 1.2.4 with a [typical payload of 15 process variables (~0.5 KB)](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/typical_payload.json). These numbers are **outdated** and serve only as a rough order-of-magnitude estimate:

- Zeebe: 75 kb / PI.
- Operate: 57 kb / PI.
- Optimize: 21 kb / PI.
- Tasklist: 21 kb / PI.
- Sum: 174 kb / PI.

Using your throughput and retention settings, you can calculate the required disk space for your scenario. Example (using the outdated 1.2.4 constants for illustration):

| Indicator                  | Calculation method |          Value | Notes                                                                                               |
| :------------------------- | :----------------: | -------------: | :-------------------------------------------------------------------------------------------------- |
| Process instances per day  |                    |         20,000 |                                                                                                     |
| **Runtime**                |                    |                |                                                                                                     |
| Typical process cycle time |     \* 5 days      |        100,000 | How long is a process instance typically active? Determines the number of active process instances. |
| Disk space for Zeebe       |     \* 75 kib      |       7.15 GiB | Converted into GB by / 1024 / 1024.                                                                 |
| Disk space for Tasklist    |     \* 21 kib      |       0.67 GiB |                                                                                                     |
| **Operate**                |                    |                |                                                                                                     |
| PI in retention time       |     \* 30 day      |        600,000 |                                                                                                     |
| Disk space                 |     \* 57 kib      |      32.62 GiB |                                                                                                     |
| **Optimize**               |                    |                |                                                                                                     |
| PI in retention time       |    \* 6 months     |      3,600,000 |                                                                                                     |
| Disk space                 |     \* 21 kib      |      72.10 GiB |                                                                                                     |
| **Sum**                    |                    | **113.87 GiB** |                                                                                                     |

### Impact of Optimize

Optimize is an optional component that provides process analytics and reporting. When enabled, it has significant implications for sizing.

#### Why Optimize matters for sizing

- Optimize reads data from Elasticsearch (exported by the Camunda Exporter) and writes it back to its own Elasticsearch indices for analytics and reporting. This creates additional load on Elasticsearch.
- In Camunda 8.8+, the Camunda Exporter and the Elasticsearch exporter run in the same thread within the broker. This means Optimize export directly competes with core platform export for throughput.
- Benchmarks show a **25-50% throughput reduction** when Optimize is enabled vs. disabled, depending on workload and payload size.

#### What Optimize affects

- **Throughput:** Fewer tasks/second achievable at the same hardware level when Optimize is running.
- **Disk space:** Optimize stores significant amounts of data in Elasticsearch, especially with large payloads. In testing, 128 Gi of ES disk was consumed in under 12 hours at 1 PI/s with the realistic payload (~11 KB) and 30-day retention.
- **Elasticsearch resources:** More CPU, memory, and disk are needed for ES when Optimize is enabled.
- **Import time:** Optimize import time increases approximately linearly with payload size. Larger payloads (for example, 11 KB realistic vs. 0.5 KB typical) result in proportionally longer import times.
- **Report loading times:** As historical data accumulates in Elasticsearch, Optimize report loading times increase approximately linearly.

#### Mitigations

- Consider running Optimize on a separate Elasticsearch instance to isolate its load from the core platform.
- Use variable filtering to reduce the amount of data exported/imported by Optimize.
- Tune retention periods: shorter retention means less data in ES, and better performance.
- Disable variable import entirely if variables are not needed in Optimize reports.

The sizing guidance for [SaaS](sizing-saas.md#sizing-tables) and [Self-Managed](sizing-self-managed.md#baseline-resource-configuration) provide configurations with and without Optimize to help you plan accordingly.

### Latency and cycle time

In some use cases, process cycle time (or even individual task cycle time) matters. For example, you might expose a REST endpoint that starts a process instance to calculate a customer score. The process runs four service tasks, and the REST request must return synchronously within 250 ms.

While service-task duration depends on the work performed, you can measure the workflow engine’s own overhead.

<!-- TODO: Replace the following latency measurements with current 8.8/8.9 benchmark data. The old measurements (Camunda 8 1.2.4: ~10 ms/node, ~50 ms remote worker latency) are outdated. -->

:::note
The latency measurements below are approximate and were last validated against an earlier version of Camunda 8. Updated measurements for 8.8/8.9 are pending. With the 8.8 streamlined architecture and properly aligned resources (3.5 CPU cores per broker), latency is expected to improve by approximately 2x compared to the previous distributed deployment.

Actual latency is highly environment-dependent — factors like network latency between workers and the cluster, disk I/O speed (commit latency), and cloud region placement significantly affect these numbers.
:::

As a rough estimate, you can expect:

- Single-digit millisecond processing time per process node.
- Approximately 50 ms latency to process service tasks in remote workers when running worker code in the same cloud region as the Camunda cluster.

Hence, executing four service tasks results in roughly 200-250 ms workflow engine overhead.

As you push throughput toward the cluster’s limits, latency increases because requests compete for resources, especially disk writes. If cycle time and latency matter, leave enough headroom and avoid running the cluster near full utilization to prevent resource contention.

:::tip
A good rule of thumb is to size for about **20x your average load**. This gives you capacity for peaks and keeps latency low during normal operation.
:::

| Indicator                                                      |    Number | Calculation method | Notes                                                                                      |
| :------------------------------------------------------------- | --------: | :----------------: | :----------------------------------------------------------------------------------------- |
| Onboarding instances per year                                  | 5,000,000 |                    | Business input.                                                                            |
| Expected process instances on peak day                         |   150,000 |                    | Business input.                                                                            |
| Process instances per second within business hours on peak day |      5.20 |   / (8\*60\*60)    | Only looking at the seconds within the eight business hours of a day.                      |
| Process instances per second including buffer                  |    104.16 |       \* 20        | Adding some buffer is recommended for critical, high-performance or low-latency use cases. |

### Payload size

Each process instance can hold a payload, known as [process variables](/components/concepts/variables.md)). The workflow engine must manage the variables for all running instances, and data from both running and completed process instances is forwarded to Operate and Tasklist.

Process variable size affects resource requirements. For example, there’s a big difference between storing a few strings (around 1 KB) and storing a full 1 MB JSON document. That’s why payload size is a key sizing factor.

Camunda's official benchmarks use two reference payloads:

- [**Typical payload**](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/typical_payload.json): Used for baseline measurements (~0.5 KB, 15 simple variables).
- [**Realistic payload**](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json): Used for the reference sizing benchmarks. This better represents real-world payloads (~11 KB).

:::note
Payload size has a multiplicative effect, affecting Zeebe storage, Elasticsearch export volume, Optimize import time, and query/report performance. An 11 KB payload vs. a 0.5 KB payload can change disk consumption by **10-20x**.
:::

Consider these general rules for payload size:

- The maximum [variable size per process instance is limited](/components/concepts/variables.md#variable-size-limitation), currently to roughly three MB.
- Camunda does not recommend storing large amounts of data in your process context. Refer to our [best practices on handling data in processes](/components/best-practices/development/handling-data-in-processes.md) for more details.
- Each [partition](/components/zeebe/technical-concepts/partitions.md) of the Zeebe installation can typically handle up to one GB of payload in total. Larger payloads can lead to slower processing. For example,
  one million process instances with four KB each is about 3.9 GB, so you need at least four partitions. In practice, you’d typically use six partitions, since the number of partitions is usually a multiple of the replication factor (three by default).

### Peak loads

In most scenarios, your load will be volatile rather than constant. For example, your company might start 90% of its monthly process instances on a single day of the month. The **ability to handle those peaks is the more crucial requirement and should drive your decision**, rather than the average load.

In this example, that single peak day defines your overall throughput requirements.

In addition, sizing for peaks may mean you shouldn’t assume a full 24-hour day. Instead, you might size for just the eight business hours, or even the busiest two hours—depending on your workload.

### Secondary storage

Starting with Camunda 8.9, the platform supports three secondary storage backends, each with different sizing implications.

#### Elasticsearch (default)

- The **most mature and most benchmarked** option.
- Required if you use Optimize.
- Provides full-text search capabilities used by Operate and Tasklist.

:::important
Sizing data provided throughout this guide assumes Elasticsearch unless stated otherwise.
:::

#### OpenSearch

- A drop-in alternative to Elasticsearch with a similar resource profile.
- Supported for all components including Optimize (with some feature limitations). See [supported environments](/reference/supported-environments.md) for more details.
- Sizing recommendations for Elasticsearch generally apply to OpenSearch as well.

#### RDBMS

- A different storage paradigm: a relational database instead of a document store. See the full list of [supported databases](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md#supported-rdbms).
- A different resource profile: CPU/memory-oriented rather than disk/IOPS-oriented.
- Write throughput is approximately **70% of Elasticsearch** on equivalent hardware.
- **No Optimize support**: If you need Optimize, you must run Elasticsearch alongside RDBMS.
- **Scales primarily vertically** rather than horizontally like Elasticsearch. Plan initial sizing with more headroom, as adding capacity is more disruptive.
<!-- To be validated - Potentially lower total disk space required for the same data volume (preliminary benchmarks suggest this, but detailed results are still being validated). -->
- Ideal for organizations that already operate a supported RDBMS at scale and want to avoid adding Elasticsearch to their infrastructure.
<!-- TODO: Link to RDBMS benchmark results page once PR #8159 is merged -->

### Throughput

Throughput defines how many process instances can be executed within a certain timeframe.

It is typically easy to estimate the number of process instances per day you need to execute. If you only know the number of process instances per year, Camunda recommends dividing this number by 250 (average number of working days in a year).

However, hardware sizing depends more on the **number of BPMN tasks** in a process model. If you already know your future process model, you can use it to count the number of tasks in the process. For example, the following onboarding process contains five service tasks in a typical execution:

<div bpmn="best-practices/sizing-your-environment-assets/customer_onboarding.bpmn" callouts="task1,task2,task3,task4,task5" />

:::tip
If you don't yet know the number of service tasks, Camunda recommends assuming **10 service tasks** as a rule of thumb.
:::

The number of tasks per process allows you to calculate the number of tasks per day. You can also convert this to tasks per second. For example:

| Indicator                          |    Number | Calculation method | Notes                                        |
| :--------------------------------- | --------: | :----------------: | :------------------------------------------- |
| Onboarding instances per year      | 5,000,000 |                    | Business input.                              |
| Process instances per business day |    20,000 |       / 250        | Average number of working days in a year.    |
| Tasks per day                      |   100,000 |        \* 5        | Tasks in the process model as counted above. |
| Tasks per second                   |      1.16 |   / (24\*60\*60)   | Seconds per day.                             |

In most cases, Camunda defines throughput per day, as this time frame is easier to understand. However, in high-performance use cases, you might need to define the throughput per second.

## Camunda 8.8+ resource consumption

Camunda 8.8 introduced a streamlined architecture that consolidates the broker, gateway, Operate, Tasklist, and Identity into a single application, the [Orchestration Cluster](components/orchestration-cluster.md). This changes how you think about resource consumption compared to older versions.

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

## Plan non-production environments

All clusters can be used for development, testing, integration, Q&A, and production. In Camunda 8 SaaS, production and test environments are organized as separate organizations within Camunda 8 to simplify cluster management and minimize the risk of accidentally accessing a production cluster.

:::note
Java-based functional unit tests that use [`zeebe-process-test`](https://github.com/camunda-cloud/zeebe-process-test/) run with an in-memory broker, so no development cluster is needed for this use case.
:::

For typical integration or functional test environments, you can usually deploy a small cluster even if your production environment is sized larger. This is typically sufficient, as functional tests run much smaller workloads.

Load or performance tests should ideally run on the same sizing configuration as your production cluster to yield reliable results.

A typical customer setup consists of:

- A production cluster.
- An integration or pre-production cluster (equal in size to your anticipated production cluster if you want to run load tests or benchmarks).
- A test cluster.
- Multiple developer clusters.

Ideally, each active developer runs their own cluster so the workflow engine does not need to be shared among developers. Otherwise, clusters are not isolated, which can lead to errors, for example, if Developer A deploys a new version of the same process as Developer B. Developer clusters can typically be deleted when they are no longer needed, since no data needs to be retained. As a result, you might not need one cluster per developer over time. Using in-memory unit tests further reduces contention on developer clusters.

However, some customers share a Camunda 8 cluster among developers for economic reasons. This can work well if everyone is aware of the issues that can arise.

## Next steps

Now that you understand the factors that influence sizing:

- **SaaS customers:** [Size your SaaS cluster](sizing-saas.md) to select the right cluster size.
- **Self-Managed admins:** Provision your Kubernetes cluster using these [baseline resource settings](sizing-self-managed.md).
- **Validate sizing:** [Run your own benchmarks](sizing-benchmarks.md) to test your specific workload.
