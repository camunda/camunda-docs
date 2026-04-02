---
id: sizing-your-environment
title: Size your environment
tags:
  - Database
  - Performance
  - Hardware
  - Sizing
description: "Understand the aspects relevant to Camunda 8 sizing. Once you do, use the sizing recommendations for [SaaS](sizing-saas.md) or [Self-Managed](sizing-self-managed.md) to select your appropriate configuration."
---

Understand the aspects relevant to Camunda 8 sizing. Once you do, use the sizing recommendations for [SaaS](sizing-saas.md) or [Self-Managed](sizing-self-managed.md) to select your appropriate configuration.

<!-- Anchors for backward compatibility with old single-page URLs -->
<span id="camunda-8-saas" />
<span id="camunda-8-self-managed" />
<span id="running-experiments-and-benchmarks" />

## Sizing requirements and influencing factors

Consider the following aspects when planning and sizing Camunda SaaS or Self-Managed.

### Data availability latency

Data availability latency is the time between an event occurring in the engine and it being queryable in Operate, Tasklist, or Optimize. Under heavy load or with Optimize enabled, this can lag from seconds to minutes.

Data availability latency is influenced by:

- **Exporter throughput:** The rate at which the Camunda Exporter can write events to Elasticsearch (ES).
- **Elasticsearch indexing speed:** How quickly ES can index incoming documents.
- **Elasticsearch disk usage:** High disk utilization (above ~70%) significantly increases indexing latency. Monitor ES disk usage and scale storage before hitting this threshold.

### Disk space

The workflow engine stores data for each process instance, especially to persist the current state.
In addition, it sends data to secondary storage (Elasticsearch, OpenSearch, or an RDBMS) for indexing, search, analytics, and long-term retention.

You can configure retention times for data stored in secondary storage.

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

The sizing guidance for [Self-Managed](sizing-self-managed.md#baseline-resource-configuration) provides configurations with and without Optimize to help you plan accordingly.

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

Each process instance can hold a payload, known as [process variables](/components/concepts/variables.md). The workflow engine must manage the variables for all running instances, and data from both running and completed process instances is forwarded to Operate and Tasklist.

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
- Supported for all components including Optimize. See [supported environments](/reference/supported-environments.md) for more details.
- Sizing recommendations for Elasticsearch generally apply to OpenSearch as well.

#### RDBMS

- A different storage paradigm: a relational database instead of a document store. See the full list of [supported databases](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md#supported-rdbms).
- A different resource profile: CPU/memory-oriented rather than disk/IOPS-oriented.
- Write throughput is approximately **70% of Elasticsearch** on equivalent hardware.
- **No Optimize support**: If you need Optimize, you must run Elasticsearch alongside RDBMS.
- **Scales primarily vertically** rather than horizontally like Elasticsearch. Plan initial sizing with more headroom, as adding capacity is more disruptive.
- Ideal for organizations that already operate a supported RDBMS at scale and want to avoid adding Elasticsearch to their infrastructure.
  <!-- To be validated - Potentially lower total disk space required for the same data volume (preliminary benchmarks suggest this, but detailed results are still being validated). -->
  <!-- TODO: Link to RDBMS benchmark results page once PR #8159 is merged -->

### Throughput

Throughput defines how many process instances can be executed within a certain timeframe.

It is typically easy to estimate the number of process instances per day you need to execute.
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

## Plan non-production environments

All clusters can be used for development, testing, integration, Q&A, and production.

For typical integration or functional test environments, you can usually deploy a small cluster even if your production environment is sized larger. This is typically sufficient, as functional tests run much smaller workloads.

Load or performance tests should ideally run on the same sizing configuration as your production cluster to yield reliable results.

A typical customer setup consists of:

- A production cluster.
- An integration or pre-production cluster (equal in size to your anticipated production cluster if you want to run load tests or benchmarks).
- A test cluster.
- Development clusters.

## Next steps

Now that you understand the factors that influence sizing:

- **SaaS customers:** [Size your SaaS cluster](sizing-saas.md) to select the right cluster size.
- **Self-Managed admins:** Provision your Kubernetes cluster using these [baseline resource settings](sizing-self-managed.md).
- **Validate sizing:** [Run your own benchmarks](sizing-benchmarks.md) to test your specific workload.
