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

:::tip Before you size
See [Data flow](data-flow.md) first to understand the factors that drive the recommendations on this page.
:::

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

:::note
The data below comes from Camunda 8.9 load tests. Because 8.8 and 8.9 share the same exporter architecture, it applies to 8.8+ as well.
:::

#### In short

- Enabling Optimize roughly **triples to quadruples Elasticsearch CPU and disk usage** at a [realistic workload](./sizing-benchmarks.md#reference-benchmark-scenario) (around 3.4x CPU and 3.6x disk), largely independent of throughput.
- It lowers achievable **processing throughput by 25-50% at maximum load** on the same hardware.
- The single most effective mitigation is to **keep variables out of Optimize**. This recovers around 60% of the storage and 65% of the CPU, plus most of the lost throughput, at the cost of variable-based analytics.
- Size Elasticsearch/OpenSearch accordingly (CPU, disk, **and shard budget**), or run Optimize on a **dedicated Elasticsearch/OpenSearch instance**.

For how Optimize fits into the export pipeline, see [Optimize data flow](./data-flow.md#optimize-data-flow). The full studies behind these numbers are [Impact of Optimize on Camunda](https://camunda.github.io/zeebe-chaos/2026/06/10/Impact-of-Optimize-on-Camunda) and [Reducing Optimize's Elasticsearch overhead](https://camunda.github.io/zeebe-chaos/2026/06/25/Impact-of-Optimize-Variable-Filtering).

#### Why Optimize matters for sizing

- Optimize is a second-tier consumer of the export pipeline: the Elasticsearch/OpenSearch exporter writes raw engine events, Optimize's importer reads them and writes its own analytics indices back to Elasticsearch/OpenSearch, so data is written to secondary storage twice. See [Optimize data flow](./data-flow.md#optimize-data-flow).
- In Camunda 8.8+, the Camunda Exporter and the Elasticsearch exporter run in the same thread within the broker, so Optimize data-pipeline competes directly with core platform exporting for throughput.
- The overhead is **not proportional to throughput.** It scales with process model complexity (multi-instance and call activities) and variable volume. At a realistic workload where Optimize-enabled and Optimize-disabled clusters reached identical throughput with zero backpressure, the Optimize-enabled cluster still consumed **around 3.4x more Elasticsearch CPU.** Budget for this even at comfortable throughput.

#### What Optimize affects

At a [realistic workload](./sizing-benchmarks.md#reference-benchmark-scenario), with Optimize enabled vs. disabled:

- **Elasticsearch CPU:** around 3.4x higher.
- **Elasticsearch disk:** around 3.6x more total data.
- **Throughput:** unaffected at a realistic workload, but 25-50% lower at maximum load on the same hardware.
- **Write-to-exporting latency:** around 2.6x higher.
- **Backpressure at maximum load:** around 45% with Optimize vs. 35% without.
- **Individual import latency:** increases approximately linearly with payload size.
- **Report loading times:** increase approximately linearly with the data complexity (such as process instances and variables) and as historical data accumulates.

Secondary storage memory is not a meaningful differentiator for improving performance.

:::tip
**Watch Optimize import lag.** When Optimize's importer falls behind the export rate, two problems can appear:

- **Optimize's analytics indices grow.** Optimize keeps one document per process instance and can only apply retention-based cleanup once its importer has processed the instance's completion. While the importer lags, completions are recorded late, cleanup is deferred, and Optimize's own indices grow beyond their steady-state size.
- **Data can be missed.** The raw exporter indices are cleaned up on the Elasticsearch/OpenSearch retention schedule. If the importer falls far enough behind, those records are deleted before Optimize imports them, and that data never reaches Optimize. This Exporter-Importer hazard is exactly what the 8.8 Camunda Exporter architecture removed for Operate and Tasklist.

Track import progress with the [Optimize metrics and bundled Grafana dashboards](/self-managed/operational-guides/monitoring/metrics.md). If you see persistent import lag, raise the import throughput (see [mitigations](#mitigations) for details).
:::

#### Mitigations

##### Keep variables out of Optimize (highest impact, lowest risk)

Variables dominate Optimize's storage and CPU costs on secondary storage. In benchmarks, disabling Optimize's variable storage entirely cut its disk usage roughly **14x** relative to the raw export. Isolating a customer-related variable group showed an even larger **~29x** difference, driven mostly by object variable flattening (below) rather than the variables' values themselves. See [why](./data-flow.md#optimize-data-flow) for the underlying storage mechanism. Almost the entire cost lives in Optimize's analytics indices. There are three levers, from most to least aggressive:

- **Stop exporting variables entirely.** Set `camunda.data.exporters.elasticsearch.args.index.variable: false` (OpenSearch: `camunda.data.exporters.opensearch.args.index.variable: false`) at the exporter to drop all variable records. This is the only lever that also recovers throughput because the exporter write path is the bottleneck at maximum load.
- **Export only the variables you need (name and prefix filters).** Keep a subset with name or prefix filters, for example only `customer`-prefixed variables. Use this when some variables drive Optimize reports, but most are noise.
- **[Disable variable import](/self-managed/components/optimize/configuration/variable-import.md) in Optimize.** Available on all supported versions; achieves the storage savings but does not recover throughput, because the records are still written by the exporter.

**Trade-off:** Filtered variables are unavailable in Optimize reports, including variable filters, variable-based grouping, and raw-data variable columns. These levers affect **Optimize only**; Operate and Tasklist read through the Camunda Exporter, so their variables stay intact.

##### Disable object variable flattening (high impact for object-heavy processes)

By default, Optimize [flattens each object variable](/self-managed/components/optimize/configuration/object-variables.md) into one sub-variable per property, plus the raw serialized object as its own variable. Each of these is a separate stored variable and pays the storage cost described above independently, so a single object variable with several properties can cost several times more than a single scalar variable. If you don't rely on flattened object-variable filtering, grouping, or raw-data columns in Optimize reports, disable it with `CAMUNDA_OPTIMIZE_ZEEBE_INCLUDE_OBJECT_VARIABLE=false` (or `zeebe.includeObjectVariableValue: false`). This is enabled by default in Self-Managed; Camunda SaaS disables it. In an isolated benchmark toggling only this flag, Optimize's share of total Elasticsearch disk usage dropped from 62.8% to 7.6% (an 8.3x reduction) for the same workload.

##### Other mitigations

- **Run Optimize on a separate Elasticsearch/OpenSearch instance.** Contention is bidirectional: Optimize's write spikes degrade Operate, Tasklist, and the Camunda Exporter, while heavy exporter activity degrades Optimize import. Isolation removes this mutual interference.
- **Tune retention periods.** Shorter retention means less data in Elasticsearch/OpenSearch and better performance.
- **Increase import throughput if Optimize lags.** If you notice a significant lag between the rate of exported Zeebe records and imported Optimize data, raise `CAMUNDA_OPTIMIZE_ZEEBE_MAX_IMPORT_PAGE_SIZE` so each import cycle fetches more exported records. This helps Optimize keep pace under high load, but increases memory use per fetch and can negatively impact individual record latency, as Optimize must wait to fill larger batches before processing.

#### Elasticsearch/OpenSearch shard budget

:::warning
Optimize creates a dedicated index per deployed process definition, each using at least one shard. Elasticsearch and OpenSearch cap the number of shards per node (1,000 by default), so a cluster's total shard budget is `nodes × per-node limit` (for example, 3,000 on a three-node cluster). A large or growing number of deployed process definitions consumes this budget and can approach the ceiling; small development or test clusters with few nodes reach it quickly. Once the ceiling is hit, new index creation is rejected, which cascades into exporter backpressure and stalled processing.

Account for shard budget when sizing the Elasticsearch/OpenSearch cluster, not just CPU, memory, and disk. See [impact of high process deployments on Elasticsearch](https://camunda.github.io/zeebe-chaos/2026/05/28/Impact-of-High-Process-Deployments-on-Elasticsearch).
:::

#### Zeebe record ILM retention

When the [Elasticsearch exporter retention policy](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#retention) is enabled, Zeebe record indices are deleted after the configured `minimum-age`. Optimize reads from these same indices, so the retention window must be long enough to cover Optimize's worst-case import lag. If the exporter deletes records before Optimize imports them, process instance completion events are permanently lost: Optimize records the instance as `ACTIVE` with no `endDate`, and history cleanup can never remove it.

**Minimum recommended retention:** Set `minimum-age` to at least **3 days** when running Optimize; **7 or more days** is recommended. This provides headroom for:

- Import lag that grows as the Optimize process instance index grows larger.
- Recovery time after Elasticsearch cluster events such as node restarts, rolling upgrades, and shard rebalancing.

The default `minimum-age` of `30d` provides sufficient headroom. If you reduced it to limit disk usage, verify that the new value still exceeds your observed Optimize import lag before applying it to production.

**Disk sizing:** A longer ILM retention window means Zeebe record indices are kept on disk longer before deletion. Factor the additional raw exporter index volume into your Elasticsearch disk budget when increasing `minimum-age` beyond the default.

**Self-reinforcing failure mode:** As Optimize's process instance index grows, Elasticsearch write latency increases, which raises per-batch import lag. Higher import lag increases the probability of an ILM race on the next cluster event. This cycle compounds on long-lived clusters running at sustained load. To break it, increase ILM retention and reduce the Optimize index size through history cleanup or variable filtering.

**Symptom:** If Optimize history cleanup runs on schedule but consistently completes in zero seconds against a large dataset, orphaned `ACTIVE` documents are likely accumulating. See [diagnosing stalled cleanup](/self-managed/components/optimize/configuration/history-cleanup.md#diagnosing-stalled-cleanup).

The sizing guidance for [Self-Managed](./sizing-self-managed.md#baseline-resource-configuration) provides configurations with and without Optimize to help you plan accordingly.

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

For current secondary storage benchmarks, see [RDBMS benchmark results](/self-managed/concepts/secondary-storage/rdbms-benchmark-results.md).
