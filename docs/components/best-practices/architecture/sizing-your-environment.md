---
id: sizing-your-environment
title: Sizing overview
tags:
  - Database
  - Performance
  - Hardware
  - Sizing
description: "Understand the factors that influence Camunda 8 sizing, then apply them to your SaaS or Self-Managed environment."
---

:::tip Audience
This page explains the factors that influence Camunda 8 sizing. For specific sizing recommendations, see [SaaS sizing](sizing-saas.md) or [Self-Managed sizing](sizing-self-managed.md).
:::

To size your Camunda 8 environment appropriately, you need to understand the factors that influence hardware requirements. Once you understand these factors, use the sizing recommendations for [SaaS](sizing-saas.md) or [Self-Managed](sizing-self-managed.md) to select the right configuration.

<!-- Anchors for backward compatibility with old single-page URLs -->
<span id="camunda-8-saas" />
<span id="camunda-8-self-managed" />
<span id="running-experiments-and-benchmarks" />

## Understanding influencing factors

### Throughput

Throughput defines how many process instances can be executed in a certain timeframe.

It is typically easy to estimate the number of **process instances per day** you need to execute. If you only know the number of process instances per year, we recommend dividing this number by 250 (average number of working days in a year).

But the hardware sizing depends more on the **number of BPMN tasks** in a process model. For example, you will have a much higher throughput for processes with one service task than for processes with 30 service tasks.

If you already know your future process model, you can use this to count the number of tasks for your process. For example, the following onboarding process contains five service tasks in a typical execution.

<div bpmn="best-practices/sizing-your-environment-assets/customer_onboarding.bpmn" callouts="task1,task2,task3,task4,task5" />

If you don't yet know the number of service tasks, we recommend assuming 10 service tasks as a rule of thumb.

The number of tasks per process allows you to calculate the required number of **tasks per day (tasks/day)** which can also be converted into **tasks per second (tasks/s)** (divide by 24 hours \* 60 minutes \* 60 seconds).

**Example:**

| Indicator                          |    Number | Calculation method | Comment                                     |
| :--------------------------------- | --------: | :----------------: | :------------------------------------------ |
| Onboarding instances per year      | 5,000,000 |                    | Business input                              |
| Process instances per business day |    20,000 |       / 250        | average number of working days in a year    |
| Tasks per day                      |   100,000 |        \* 5        | Tasks in the process model as counted above |
| Tasks per second                   |      1.16 |   / (24\*60\*60)   | Seconds per day                             |

In most cases, we define throughput per day, as this time frame is easier to understand. But in high-performance use cases you might need to define the throughput per second.

### Peak loads

In most scenarios, your load will be volatile and not constant. For example, your company might start 90% of their monthly process instances in the same day of the month. The **ability to handle those peaks is the more crucial requirement and should drive your decision** instead of looking at the average load.

In the above example, that one day with the peak load defines your overall throughput requirements.

Sometimes, looking at peaks might also mean that you are not looking at all 24 hours of a day, but only 8 business hours, or probably the busiest 2 hours of a day, depending on your typical workload.

### Latency and cycle time

In some use cases, the cycle time of a process (or sometimes even the cycle time of single tasks) matters. For example, you want to provide a REST endpoint that starts a process instance to calculate a score for a customer. This process needs to execute four service tasks, but the REST request should return a response synchronously, no later than 250 milliseconds after the request.

While the cycle time of service tasks depends very much on what you do in these tasks, the overhead of the workflow engine itself can be measured.

<!-- TODO: Replace the following latency measurements with current 8.8/8.9 benchmark data. The old measurements (Camunda 8 1.2.4: ~10 ms/node, ~50 ms remote worker latency) are outdated. -->

:::note
The latency measurements below are approximate and were last validated against an earlier version of Camunda 8. Updated measurements for 8.8/8.9 are pending. With the 8.8 streamlined architecture and properly aligned resources (3.5 CPU cores per broker), latency is expected to improve by approximately 2x compared to the previous distributed deployment.

Actual latency is highly environment-dependent — factors like network latency between workers and the cluster, disk I/O speed (commit latency), and cloud region placement significantly affect these numbers.
:::

As a rough guide, expect single-digit millisecond processing time per process node and approximately 50 ms latency to process service tasks in remote workers when running worker code in the same cloud region as the Camunda cluster. Hence, to execute 4 service tasks results in roughly 200-250 ms workflow engine overhead.

The closer you push throughput to the limits, the more latency you will get. This is because the different requests compete for hardware resources, especially disk write operations. As a consequence, whenever cycle time and latency matters to you, you should plan for hardware buffer to not utilize your cluster too much. This makes sure your latency does not go up because of resource contention. A good rule of thumb is to multiply your average load by 20. This means you cannot only accommodate unexpected peak loads, but also have more free resources on average, keeping latency down.

| Indicator                                                      |    Number | Calculation method | Comment                                                                                 |
| :------------------------------------------------------------- | --------: | :----------------: | :-------------------------------------------------------------------------------------- |
| Onboarding instances per year                                  | 5,000,000 |                    | Business input, but irrelevant                                                          |
| Expected process instances on peak day                         |   150,000 |                    | Business input                                                                          |
| Process instances per second within business hours on peak day |      5.20 |   / (8\*60\*60)    | Only looking at seconds of the 8 business hours of a day                                |
| Process instances per second including buffer                  |    104.16 |       \* 20        | Adding some buffer is recommended in critical high-performance or low-latency use cases |

### Payload size

Every process instance can hold a payload (known as [process variables](/components/concepts/variables.md)). The payload of all running process instances must be managed by the runtime workflow engine, and all data of running and ended process instances is also forwarded to Operate and Tasklist.

The data you attach to a process instance (process variables) influences resource requirements. For example, it makes a big difference if you only add one or two strings (requiring around 1 KB of space) to your process instances, or a full JSON document containing 1 MB. Hence, the payload size is an important factor when looking at sizing.

Camunda's official benchmarks use two reference payloads:

- **Typical payload:** [typical_payload.json](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/typical_payload.json) (~0.5 KB, 15 simple variables) -- used for baseline measurements.
- **Realistic payload:** [realisticPayload.json](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB) -- used for the reference sizing benchmarks. This better represents real-world payloads.

Payload size has a **multiplicative effect**: it affects Zeebe storage, Elasticsearch export volume, Optimize import time, and query/report performance. An 11 KB payload vs. a 0.5 KB payload can change disk consumption by 10-20x.

There are a few general rules regarding payload size:

- The maximum [variable size per process instance is limited](/components/concepts/variables.md#variable-size-limitation), currently to roughly 3 MB.
- We don't recommend storing much data in your process context. Refer to our [best practice on handling data in processes](/components/best-practices/development/handling-data-in-processes.md).
- Every [partition](/components/zeebe/technical-concepts/partitions.md) of the Zeebe installation can typically handle up to 1 GB of payload in total. Larger payloads can lead to slower processing. For example, if you run one million process instances with 4 KB of data each, you end up with 3.9 GB of data, and you should run at least four partitions. In reality, this typically means six partitions, as you want to run the number of partitions as a multiple of the replication factor, which by default is three.

### Disk space

The workflow engine itself will store data along every process instance, especially to keep the current state persistent. This is unavoidable. In case there are user tasks, data is also sent to Tasklist and kept there, until tasks are completed.

Furthermore, data is also sent to Operate and Optimize, which store data in Elasticsearch. These tools keep historical audit data for the configured retention times. The total amount of disk space can be reduced by using **data retention settings**. We typically delete data in Operate after 30 to 90 days, but keep it in Optimize for a longer period of time to allow more analysis. A good rule of thumb is something between 6 and 18 months.

:::note
Elasticsearch needs enough memory available to load a large amount of this data into memory.
:::

:::caution Disk space estimates are approximate
The kb/PI model below is a **rough approximation**. In practice, disk consumption depends on multiple factors and varies non-linearly:

- **Payload size:** A 0.5 KB payload vs. 11 KB payload can change disk consumption by 10-20x.
- **Flow node count per process:** More flow nodes = more Elasticsearch documents.
- **Variable cardinality:** Object variables with nested structures create exponentially more Elasticsearch nested documents.
- **Write amplification in Zeebe:** Compaction, WAL, and index overhead increase raw disk usage beyond the logical data size.

For non-trivial payloads (>1 KB) or long retention periods, **run your own disk space benchmarks** rather than relying solely on these estimates. See [Running benchmarks](sizing-benchmarks.md).
:::

<!-- TODO: Update disk space measurements for 8.8/8.9. The following numbers were measured with Camunda 8 SaaS 1.2.4 using the typical payload (~0.5 KB). They are significantly outdated and do not reflect current storage behavior, especially with the realistic payload (~11 KB). -->

The following approximate disk space measurements were taken using Camunda 8 SaaS 1.2.4 with a [typical payload of 15 process variables (~0.5 KB)](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/typical_payload.json). These numbers are **outdated** and serve only as a rough order-of-magnitude guide:

- Zeebe: 75 kb / PI
- Operate: 57 kb / PI
- Optimize: 21 kb / PI
- Tasklist: 21 kb / PI
- Sum: 174 kb / PI

A more accurate model would account for payload size, flow node count, and variable cardinality:

```
Disk_Zeebe = active_PI x (base_overhead_kb + avg_payload_KB x amplification_factor)
Disk_ES   = PI_in_retention x (base_kb + avg_payload_KB x payload_factor + avg_flow_nodes x fn_factor)
```

<!-- TODO: Determine actual factor values (base_overhead_kb, amplification_factor, payload_factor, fn_factor) through dedicated benchmarking. This is planned as a separate project. -->

Using your throughput and retention settings, you can calculate the required disk space for your scenario. Example (using the outdated 1.2.4 constants for illustration):

| Indicator                  | Calculation method |          Value | Comments                                                                                           |
| :------------------------- | :----------------: | -------------: | :------------------------------------------------------------------------------------------------- |
| Process instances per day  |                    |         20,000 |                                                                                                    |
| **Runtime**                |                    |                |                                                                                                    |
| Typical process cycle time |     \* 5 days      |        100,000 | How long is a process instance typically active? Determines the number of active process instances |
| Disk space for Zeebe       |     \* 75 kib      |       7.15 GiB | (Converted into GB by / 1024 / 1024)                                                               |
| Disk space for Tasklist    |     \* 21 kib      |       0.67 GiB |                                                                                                    |
| **Operate**                |                    |                |                                                                                                    |
| PI in retention time       |     \* 30 day      |        600,000 |                                                                                                    |
| Disk space                 |     \* 57 kib      |      32.62 GiB |                                                                                                    |
| **Optimize**               |                    |                |                                                                                                    |
| PI in retention time       |    \* 6 months     |      3,600,000 |                                                                                                    |
| Disk space                 |     \* 21 kib      |      72.10 GiB |                                                                                                    |
| **Sum**                    |                    | **113.87 GiB** |                                                                                                    |

### Impact of Optimize

Optimize is an optional component that provides process analytics and reporting. When enabled, it has significant implications for sizing.

#### Why Optimize matters for sizing

- Optimize runs an **importer** that reads data from Elasticsearch (exported by the Camunda Exporter) and writes it back to its own Elasticsearch indices for analytics and reporting.
- This creates **additional load on Elasticsearch**: both read (importer fetching pages) and write (indexing into Optimize indices).
- In Camunda 8.8+, the Camunda Exporter and the Elasticsearch exporter (used by Optimize) run **in the same thread** within the broker. This means Optimize export directly competes with core platform export for throughput.
- Benchmarks show a **25-50% throughput reduction** when Optimize is enabled vs. disabled, depending on workload and payload size.

#### What Optimize affects

- **Throughput:** Fewer tasks/second achievable at the same hardware level when Optimize is running.
- **Disk space:** Optimize stores significant amounts of data in Elasticsearch, especially with large payloads. In testing, 128 Gi of ES disk was consumed in under 12 hours at 1 PI/s with the realistic payload (~11 KB) and 30-day retention.
- **Elasticsearch resources:** More CPU, memory, and disk are needed for ES when Optimize is enabled.
- **Import time:** Optimize import time increases approximately linearly with payload size. Larger payloads (e.g., 11 KB realistic vs. 0.5 KB typical) result in proportionally longer import times.
- **Report loading times:** As historical data accumulates in Elasticsearch, Optimize report loading times increase approximately linearly.

#### Mitigations

- Consider running Optimize on a **separate Elasticsearch instance** to isolate its load from the core platform.
- Use **variable filtering** to reduce the amount of data exported/imported by Optimize.
- Tune **retention periods** -- shorter retention means less data in ES, better performance.
- **Disable variable import** entirely if variables are not needed in Optimize reports.

The sizing tables in the [SaaS](sizing-saas.md) and [Self-Managed](sizing-self-managed.md) pages provide separate configurations with and without Optimize to help you plan accordingly.

### Data availability latency

Data availability latency is the time between an event occurring in the engine and it being queryable in Operate, Tasklist, or Optimize. Under heavy load or with Optimize enabled, this can lag from seconds to minutes.

Data availability latency is influenced by:

- **Exporter throughput:** The rate at which the Camunda Exporter can write events to Elasticsearch.
- **Elasticsearch indexing speed:** How quickly ES can index incoming documents.
- **Elasticsearch disk usage:** High disk utilization (above ~70%) significantly increases indexing latency. Monitor ES disk usage and scale storage before hitting this threshold.

### Choosing your secondary storage

Starting with Camunda 8.9, the platform supports three secondary storage backends, each with different sizing implications.

#### Elasticsearch (default)

- The **most mature and most benchmarked** option.
- **Required** if you use Optimize (Optimize does not yet support RDBMS).
- All sizing tables in this guide assume Elasticsearch unless stated otherwise.
- Provides full-text search capabilities used by Operate and Tasklist.

#### OpenSearch

- Drop-in alternative to Elasticsearch with a similar resource profile.
- Supported for all components including Optimize (with some feature limitations -- see [supported environments](/reference/supported-environments.md)).
- Sizing recommendations for Elasticsearch generally apply to OpenSearch as well.

#### RDBMS (PostgreSQL) -- available from 8.9

- A fundamentally different storage paradigm: relational database instead of document store.
- Key trade-offs:
  - Write throughput is approximately **70% of Elasticsearch** for equivalent hardware.
  - Different resource profile: CPU/memory-oriented rather than disk/IOPS-oriented.
  - **No Optimize support** -- if you need Optimize, you must also run Elasticsearch alongside RDBMS.
  - **Scales primarily vertically** (larger instance) rather than horizontally like Elasticsearch. Plan initial sizing with more headroom, as adding capacity is more disruptive.
  - Potentially lower total disk space required for the same data volume (preliminary benchmarks suggest this, but detailed results are still being validated).
- Ideal for organizations that already operate PostgreSQL at scale and want to avoid adding Elasticsearch to their infrastructure.
<!-- TODO: Link to RDBMS benchmark results page once PR #8159 is merged -->

:::note
Your choice of secondary storage affects the sizing tables in this guide. The SaaS sizing tables assume Elasticsearch. For Self-Managed deployments using RDBMS, adjust throughput expectations downward by approximately 30% compared to the Elasticsearch-based tables, and replace the Elasticsearch resource block with appropriately sized PostgreSQL resources.
:::

## Understanding sizing and scalability behavior

Camunda 8.8 introduced a **streamlined architecture** that consolidates the broker, gateway, Operate, Tasklist, and Identity into a single application (the **Orchestration Cluster**). This changes how you think about resource consumption compared to older versions.

:::note Upgrading from pre-8.8?
If you are upgrading from a pre-8.8 version, expect different resource profiles:

- The consolidated application requires **more CPU per broker** compared to 8.7 (approximately 75% more CPU -- e.g., 2 to 3.5 cores -- to maintain equivalent throughput).
- Throughput at default 2 CPU cores drops ~35% vs. 8.7.x.
- With properly aligned resources (3.5 CPU cores), 8.8.x achieves **similar throughput** to 8.7.x with **significantly lower latency** (approximately 2x improvement).
- The streamlined architecture **reduces operational complexity** (fewer pods to manage) but consolidates resource consumption into fewer, larger pods.

The sizing tables in this guide reflect the **8.8+ architecture**.
:::

All components are clustered to provide high-availability, fault-tolerance, and resiliency.

The Orchestration Cluster scales horizontally by adding more nodes (pods). This is **limited by the [number of partitions](/components/zeebe/technical-concepts/partitions.md)** configured for a cluster, as the work within one partition cannot be parallelized by design. Hence, you need to define enough partitions to utilize your hardware. The **[number of partitions can be scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) after the cluster is initially provisioned**, but not yet scaled down.

Camunda 8 runs on Kubernetes. Every component is operated as a pod that gets resources assigned. These resources can be vertically scaled (get more or less hardware resources assigned dynamically) within certain limits. Note that vertical scaling does not always result in more throughput, as the various components have dependencies on each other. This is a complex topic and requires running experiments with benchmarks. In general, we recommend starting with the configurations described in the [SaaS](sizing-saas.md) or [Self-Managed](sizing-self-managed.md) sizing pages, then adjusting based on your workload.

Note that Camunda licensing does not depend on the provisioned hardware resources, making it easy to size according to your needs.

## Planning non-production environments

All clusters can be used for development, testing, integration, Q&A, and production. In Camunda 8 SaaS, production and test environments are organized via separate organizations within Camunda 8 to ease the management of clusters, while also minimizing the risk of accidentally accessing a production cluster.

Note that functional unit tests that are written in Java and use [zeebe-process-test](https://github.com/camunda-cloud/zeebe-process-test/), will use an in-memory broker in unit tests, so no development cluster is needed for this use case.

For typical integration or functional test environments, you can normally just deploy a small cluster, even if your production environment is sized bigger. This is typically sufficient, as functional tests typically run much smaller workloads.

Load or performance tests ideally run on the same sizing configuration as your production instance to yield reliable results.

A typical customer set-up consists of:

- 1 Production cluster
- 1 Integration or pre-prod cluster (equal in size to your anticipated production cluster if you want to run load tests or benchmarks)
- 1 Test cluster
- Multiple developer clusters

Ideally, every active developer runs its own cluster, so that the workflow engine does not need to be shared amongst developers. Otherwise, clusters are not isolated, which can lead to errors if for example developer A deploys a new version of the same process as developer B. Typically, developer clusters can be deleted when they are no longer used, as no data needs to be kept, so you might not need one cluster per developer that works with Camunda 8 at some point in time. And using in-memory unit tests further reduces the contention on developer clusters.

However, some customers do share a Camunda 8 cluster amongst various developers for economic reasons. This can work well if everybody is aware of the problems that can arise.

## Next steps

Now that you understand the factors that influence sizing:

- **SaaS customers:** See [SaaS cluster sizing](sizing-saas.md) to select the right cluster size.
- **Self-Managed admins:** See [Self-Managed resource planning](sizing-self-managed.md) for starting-point Kubernetes configurations.
- **Validating sizing:** See [Running benchmarks](sizing-benchmarks.md) to test your specific workload against a cluster.
