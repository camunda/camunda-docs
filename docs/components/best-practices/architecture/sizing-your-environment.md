---
id: sizing-your-environment
title: Sizing your environment
tags:
  - Database
  - Performance
  - Hardware
  - Sizing
description: "Define and size your environment for Camunda 8 appropriately by understanding the factors that influence hardware requirements."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To define and size your environment for Camunda 8 appropriately, you need to understand the factors that influence hardware requirements. You can then apply this knowledge to select the appropriate Camunda 8 SaaS hardware package or size your self-managed Kubernetes cluster.

:::tip
The sizing numbers in this guide were measured using the [Camunda 8 benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) with a [realistic process model](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) containing a mix of BPMN symbols such as tasks, events, and call activities including subprocesses. You are encouraged to [run your own benchmarks](#running-experiments-and-benchmarks) using this project to validate sizing for your specific workload.
:::

## Understanding influencing factors

Several factors determine how large your Camunda 8 environment needs to be. Understanding these factors is critical before selecting a cluster size or provisioning infrastructure.

### Throughput

Throughput defines how many process instances can be executed in a certain timeframe.

It is typically easy to estimate the number of **process instances per day** you need to execute. If you only know the number of process instances per year, divide this number by 250 (the average number of working days in a year).

Hardware sizing depends more on the **number of BPMN tasks** in a process model. For example, you will have a much higher throughput for processes with one service task than for processes with 30 service tasks.

If you already know your future process model, you can use this to count the number of tasks for your process. For example, the following onboarding process contains five service tasks in a typical execution:

<div bpmn="best-practices/sizing-your-environment-assets/customer_onboarding.bpmn" callouts="task1,task2,task3,task4,task5" />

If you don't yet know the number of service tasks, assume 10 service tasks as a rule of thumb.

The number of tasks per process allows you to calculate the required number of **tasks per day (tasks/day)** which can also be converted into **tasks per second (tasks/s)** (divide by 24 hours \* 60 minutes \* 60 seconds).

**Example:**

| Indicator                          |    Number | Calculation method | Comment                                     |
| :--------------------------------- | --------: | :----------------: | :------------------------------------------ |
| Onboarding instances per year      | 5,000,000 |                    | Business input                              |
| Process instances per business day |    20,000 |       / 250        | Average number of working days in a year    |
| Tasks per day                      |   100,000 |        \* 5        | Tasks in the process model as counted above |
| Tasks per second                   |      1.16 |   / (24\*60\*60)   | Seconds per day                             |

In most cases, defining throughput per day is easier to understand. In high-performance use cases, you might need to define the throughput per second.

### Peak loads

In most scenarios, your load will be volatile and not constant. For example, your company might start 90% of their monthly process instances in the same day of the month. The **ability to handle those peaks is the more crucial requirement and should drive your decision** instead of looking at the average load.

In the above example, that one day with the peak load defines your overall throughput requirements.

Sometimes, looking at peaks might also mean that you are not looking at all 24 hours of a day, but only 8 business hours, or probably the busiest 2 hours of a day, depending on your typical workload.

### Latency and cycle time

In some use cases, the cycle time of a process (or even the cycle time of single tasks) matters. For example, you want to provide a REST endpoint that starts a process instance to calculate a score for a customer. This process needs to execute four service tasks, but the REST request should return a response synchronously, no later than 250 milliseconds after the request.

While the cycle time of service tasks depends very much on what you do in these tasks, the overhead of the workflow engine itself can be measured. As a general guideline, expect approximately 10 ms processing time per process node and approximately 50 ms latency to process service tasks in remote workers when running worker code in the same cloud zone as Camunda 8. Hence, executing 4 service tasks results in roughly 240 ms workflow engine overhead.

:::note
Latency characteristics can vary based on your Camunda version, infrastructure, and configuration. For latency-critical use cases, we strongly recommend [running your own benchmarks](#running-experiments-and-benchmarks) to measure actual latency in your environment.
:::

The closer you push throughput to the limits, the more latency you will get. This is because the different requests compete for hardware resources, especially disk write operations. As a consequence, whenever cycle time and latency matters to you, plan for hardware buffer to not utilize your cluster too much. This makes sure your latency does not go up because of resource contention. A good rule of thumb is to multiply your average load by 20. This means you can accommodate unexpected peak loads and also have more free resources on average, keeping latency down.

| Indicator                                                      |    Number | Calculation method | Comment                                                                                 |
| :------------------------------------------------------------- | --------: | :----------------: | :-------------------------------------------------------------------------------------- |
| Onboarding instances per year                                  | 5,000,000 |                    | Business input, but irrelevant                                                          |
| Expected process instances on peak day                         |   150,000 |                    | Business input                                                                          |
| Process instances per second within business hours on peak day |      5.20 |   / (8\*60\*60)    | Only looking at seconds of the 8 business hours of a day                                |
| Process instances per second including buffer                  |    104.16 |       \* 20        | Adding some buffer is recommended in critical high-performance or low-latency use cases |

### Payload size

Every process instance can hold a payload (known as [process variables](/components/concepts/variables.md)). The payload of all running process instances must be managed by the runtime workflow engine, and all data of running and ended process instances is also forwarded to Operate and Optimize.

The data you attach to a process instance (process variables) influences resource requirements. For example, it makes a big difference if you only add one or two strings (requiring around 1 KB of space) to your process instances, or a full JSON document containing 1 MB. Hence, the payload size is an important factor when looking at sizing.

There are a few general rules regarding payload size:

- The maximum [variable size per process instance is limited](/components/concepts/variables.md#variable-size-limitation), currently to roughly 3 MB.
- We don't recommend storing much data in your process context. Refer to our [best practice on handling data in processes](/components/best-practices/development/handling-data-in-processes.md).
- Every [partition](/components/zeebe/technical-concepts/partitions.md) of the Zeebe installation can typically handle up to 1 GB of payload in total. Larger payloads can lead to slower processing. For example, if you run one million process instances with 4 KB of data each, you end up with 3.9 GB of data, and you should run at least four partitions. In reality, this typically means six partitions, as you want to run the number of partitions as a multiple of the replication factor, which by default is three.

The payload size also affects disk space requirements, as described in the next section.

### Optimize

[Optimize](/components/optimize/what-is-optimize.md) is an optional analytics component that has a significant impact on environment sizing. Understanding whether you plan to run Optimize is important because it affects both processing capacity and disk requirements.

**Why Optimize impacts sizing:**

- **Elasticsearch/OpenSearch load:** Optimize runs an **importer** that continuously reads data from the workflow engine and writes it into Elasticsearch/OpenSearch. This creates additional read and write load on Elasticsearch/OpenSearch, which can impact the performance of other components (such as Operate and Tasklist) that share the same Elasticsearch/OpenSearch cluster.
- **Disk space:** Optimize typically retains data for longer periods (6 to 18 months) compared to Operate (30 to 90 days), significantly increasing the total disk space required for Elasticsearch/OpenSearch.
- **Processing overhead:** The Optimize importer consumes CPU and memory resources. Under high throughput, this additional processing can reduce the overall throughput available for the core workflow engine if resources are constrained.
- **Elasticsearch/OpenSearch memory:** More data stored by Optimize means Elasticsearch/OpenSearch requires more memory to maintain its indices efficiently.

:::note
The sizing tables in this guide provide separate configurations for deployments **with** and **without** Optimize. If you are unsure whether you will use Optimize, start with the "without Optimize" configuration and add Optimize resources later as needed.
:::

### Disk space

The workflow engine itself stores data for every process instance to keep the current state persistent. This is unavoidable. In case there are user tasks, data is also sent to Tasklist and kept there until tasks are completed.

Furthermore, data is also sent to Operate and (optionally) Optimize, which store data in Elasticsearch/OpenSearch. These tools keep historical audit data for the configured retention times. The total amount of disk space can be reduced by using **data retention settings**. Operate data is typically deleted after 30 to 90 days. If Optimize is enabled, its data is kept for a longer period to allow more analysis. A good rule of thumb for Optimize retention is between 6 and 18 months.

:::note
Elasticsearch/OpenSearch needs enough memory available to load a large amount of this data into memory.
:::

Assuming a [typical payload of 15 process variables (simple strings, numbers, or booleans)](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/typical_payload.json), Camunda measured the following approximate disk space requirements. These are not exact numbers, but they can help you estimate what to expect:

- Zeebe: 75 KB / PI
- Operate: 57 KB / PI
- Optimize: 21 KB / PI (only if Optimize is enabled)
- Tasklist: 21 KB / PI
- Sum (without Optimize): 153 KB / PI
- Sum (with Optimize): 174 KB / PI

Using your throughput and retention settings, you can calculate the required disk space for your scenario.

<Tabs groupId="optimize" defaultValue="withOptimize" values={[{label: 'With Optimize', value: 'withOptimize'},{label: 'Without Optimize', value: 'withoutOptimize'}]}>
<TabItem value="withOptimize">

| Indicator                  | Calculation method |          Value | Comments                                                                                           |
| :------------------------- | :----------------: | -------------: | :------------------------------------------------------------------------------------------------- |
| Process instances per day  |                    |         20,000 |                                                                                                    |
| **Runtime**                |                    |                |                                                                                                    |
| Typical process cycle time |     \* 5 days      |        100,000 | How long is a process instance typically active? Determines the number of active process instances |
| Disk space for Zeebe       |      \* 75 KB      |       7.15 GiB | (Converted into GiB by / 1024 / 1024)                                                              |
| Disk space for Tasklist    |      \* 21 KB      |       2.00 GiB |                                                                                                    |
| **Operate**                |                    |                |                                                                                                    |
| PI in retention time       |     \* 30 days     |        600,000 |                                                                                                    |
| Disk space                 |      \* 57 KB      |      32.62 GiB |                                                                                                    |
| **Optimize**               |                    |                |                                                                                                    |
| PI in retention time       |    \* 6 months     |      3,600,000 |                                                                                                    |
| Disk space                 |      \* 21 KB      |      72.10 GiB |                                                                                                    |
| **Sum**                    |                    | **113.87 GiB** |                                                                                                    |

</TabItem>
<TabItem value="withoutOptimize">

| Indicator                  | Calculation method |         Value | Comments                                                                                           |
| :------------------------- | :----------------: | ------------: | :------------------------------------------------------------------------------------------------- |
| Process instances per day  |                    |        20,000 |                                                                                                    |
| **Runtime**                |                    |               |                                                                                                    |
| Typical process cycle time |     \* 5 days      |       100,000 | How long is a process instance typically active? Determines the number of active process instances |
| Disk space for Zeebe       |      \* 75 KB      |      7.15 GiB | (Converted into GiB by / 1024 / 1024)                                                              |
| Disk space for Tasklist    |      \* 21 KB      |      2.00 GiB |                                                                                                    |
| **Operate**                |                    |               |                                                                                                    |
| PI in retention time       |     \* 30 days     |       600,000 |                                                                                                    |
| Disk space                 |      \* 57 KB      |     32.62 GiB |                                                                                                    |
| **Sum**                    |                    | **41.77 GiB** |                                                                                                    |

</TabItem>
</Tabs>

## Understanding sizing and scalability behavior

Spinning up a Camunda 8 cluster means you run multiple components that all need resources in the background, such as the Zeebe broker, Elasticsearch/OpenSearch (as the database for Operate, Tasklist, and optionally Optimize), Operate, Tasklist, and optionally Optimize. All those components need to be equipped with resources.

All components are clustered to provide high-availability, fault-tolerance, and resiliency.

Zeebe scales horizontally by adding more cluster nodes (pods). This is **limited by the [number of partitions](/components/zeebe/technical-concepts/partitions.md)** configured for a Zeebe cluster, as the work within one partition cannot be parallelized by design. Hence, you need to define enough partitions to utilize your hardware. The **[number of partitions can be scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) after the cluster is initially provisioned**, but not yet scaled down.

If you anticipate the load increasing over time, prepare by configuring more partitions than you currently need as a buffer. For example, you could multiply the number of partitions you need for your current load by four to add a buffer. This typically has just a small impact on performance.

Camunda 8 runs on Kubernetes. Every component is operated as a pod that gets resources assigned. These resources can be vertically scaled (getting more or fewer hardware resources assigned dynamically) within certain limits. Note that vertical scaling does not always result in more throughput, as the various components have dependencies on each other. This is a complex topic and requires running experiments with benchmarks. In general, start with the minimalistic hardware package as described below. If you have further requirements, use this as a starting point to increase resources.

Note that Camunda licensing does not depend on the provisioned hardware resources, making it easy to size according to your needs.

## Sizing your runtime environment

First, calculate your requirements using the information provided above, taking the example calculations from above:

- Throughput: 20,000 process instances / day
- Disk space (with Optimize): ~114 GiB
- Disk space (without Optimize): ~42 GiB

Now you can select a hardware package that can cover these requirements.

### Camunda 8 SaaS

Camunda 8 defines four [cluster sizes](/components/concepts/clusters.md#cluster-size) you can select from (1x, 2x, 3x, and 4x) after you have chosen your [cluster type](/components/concepts/clusters.md#cluster-type). The following table gives you an indication of what requirements you can fulfill with each cluster size.

:::note
Contact your Customer Success Manager to increase the cluster size beyond the maximum 4x size. This requires custom sizing and pricing.
:::

<Tabs groupId="optimize" defaultValue="withOptimize" values={[{label: 'With Optimize', value: 'withOptimize'},{label: 'Without Optimize', value: 'withoutOptimize'}]}>
<TabItem value="withOptimize">

| Cluster size                                                                                |                                 1x |                                 2x |                                 3x |                                 4x |
| :------------------------------------------------------------------------------------------ | ---------------------------------: | ---------------------------------: | ---------------------------------: | ---------------------------------: |
| Max Throughput **Tasks/day** **[1]**                                                        |                                9 M |                               18 M |                               27 M |                               36 M |
| Max Throughput **Tasks/second** **[1]**                                                     |                                100 |                                200 |                                300 |                                400 |
| Max Throughput **Process Instances/second** **[2]**                                         |                                  5 |                                 10 |                                 15 |                                 20 |
| Max Total Number of Process Instances stored (in Elasticsearch/OpenSearch in total) **[3]** |                              200 k |                              400 k |                              600 k |                              800 k |
| Approximate resources provisioned **[4]**                                                   | 15 vCPU, 28 GB memory, 264 GB disk | 26 vCPU, 50 GB memory, 456 GB disk | 37 vCPU, 72 GB memory, 648 GB disk | 48 vCPU, 94 GB memory, 840 GB disk |

</TabItem>
<TabItem value="withoutOptimize">

| Cluster size                                                                                |                                 1x |                                 2x |                                 3x |                                 4x |
| :------------------------------------------------------------------------------------------ | ---------------------------------: | ---------------------------------: | ---------------------------------: | ---------------------------------: |
| Max Throughput **Tasks/day** **[1]**                                                        |                                9 M |                               18 M |                               27 M |                               36 M |
| Max Throughput **Tasks/second** **[1]**                                                     |                                100 |                                200 |                                300 |                                400 |
| Max Throughput **Process Instances/second** **[2]**                                         |                                  5 |                                 10 |                                 15 |                                 20 |
| Max Total Number of Process Instances stored (in Elasticsearch/OpenSearch in total) **[3]** |                              200 k |                              400 k |                              600 k |                              800 k |
| Approximate resources provisioned **[4]**                                                   | 11 vCPU, 22 GB memory, 192 GB disk | 22 vCPU, 44 GB memory, 384 GB disk | 33 vCPU, 66 GB memory, 576 GB disk | 44 vCPU, 88 GB memory, 768 GB disk |

</TabItem>
</Tabs>

The numbers in the table were measured using Camunda 8 (version 8.8), the [benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) running on its own Kubernetes cluster, and using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) containing a mix of BPMN symbols such as tasks, events, and call activities including subprocesses. To calculate day-based metrics, an equal distribution over 24 hours is assumed.

**[1]** Tasks (service tasks, send tasks, user tasks, and so on) completed per day is the primary metric, as this is easy to measure and has a strong influence on resource consumption. This number assumes a constant load over the day. Tasks/day and tasks/second are scaled linearly.

**[2]** As tasks are the primary resource driver, the number of process instances supported by a cluster is calculated based on the assumption of an average of 10 tasks per process. You can calculate a more accurate process instance estimate using your anticipated number of tasks per process.

**[3]** Max total number of historical process instances within the retention period. For active process instances this is limited mostly by the Zeebe resources and for historical instances by Elasticsearch/OpenSearch resources. Calculated assuming a typical set of process variables for process instances. Note that it makes a difference if you add one or two strings (requiring ~1 KB of space) to your process instances, or if you attach a full JSON document containing 1 MB, as this data needs to be stored in various places, influencing memory and disk requirements. If this number increases, you can still retain the runtime throughput, but Tasklist, Operate, and/or Optimize may lag behind. The provisioned disk size is calculated as the sum of the disk size used by Zeebe and Elasticsearch/OpenSearch.

The max throughput numbers should be considered as peak loads, and the data retention configuration considered when defining the amount of data kept for completed instances in your cluster. See [Camunda 8 SaaS data retention](/components/saas/data-retention.md) for the default retention times for Zeebe, Tasklist, Operate, and Optimize.

- If process instances are completed and older than the configured retention time of an application, the data is removed.
- If a process instance is older than the configured retention time but still active and incomplete, it is fully functioning in runtime and is _not_ removed.

Data retention can be adjusted by Camunda on request (up to certain limits). You should consider retention time adjustments and/or storage capacity increases if you plan to run more than [max PI stored in ES] / [configured retention time].

**[4]** These are the resource limits configured in the Kubernetes cluster and are always subject to change. The "with Optimize" configuration includes additional resources for the Optimize importer, webapp, and the extra Elasticsearch/OpenSearch load it generates.

:::note
Why is the total number of process instances stored that low? This is related to limited resources provided to Elasticsearch/OpenSearch, yielding performance problems with too much data stored there. By increasing the available memory to Elasticsearch/OpenSearch you can also increase that number. At the same time, even with this rather low number, you can always guarantee the throughput of the core workflow engine during peak loads, as this performance is not influenced. You can always increase memory for Elasticsearch/OpenSearch later if required.
:::

### Camunda 8 Self-Managed

Provisioning Camunda 8 onto your Self-Managed Kubernetes cluster might depend on various factors. For example, most customers already have their own teams providing Elasticsearch/OpenSearch for them as a service.

The following tables show possible configurations which are close to a cluster of size 1x in Camunda 8 SaaS, and can serve as a starting point for your own sizing.

<Tabs groupId="optimize" defaultValue="withOptimize" values={[{label: 'With Optimize', value: 'withOptimize'},{label: 'Without Optimize', value: 'withoutOptimize'}]}>
<TabItem value="withOptimize">

:::note
This cluster can serve roughly 65 tasks per second as a peak load, and it can store up to 100,000 process instances in Elasticsearch/OpenSearch (in-flight and history) before running out of disk space. Resource requirements are higher due to the Optimize importer and its impact on Elasticsearch/OpenSearch.
:::

|                                    |                | request | limit |
| ---------------------------------- | -------------- | ------- | ----- |
| **Orchestration cluster**          |                |         |       |
| \# brokers                         | 3              |         |       |
| \# partitions                      | 3              |         |       |
| replication factor                 | 3              |         |       |
|                                    | vCPU \[cores\] | 1       | 2     |
|                                    | Mem \[GB\]     | 2       | 3     |
|                                    | Disk \[GB\]    | 32      | 128   |
| **Connectors**                     |                |         |       |
| #                                  | 1              |         |       |
|                                    | vCPU \[cores\] | 0.2     | 0.2   |
|                                    | Mem \[GB\]     | 0.512   | 1     |
| **Optimize**                       |                |         |       |
| # importer                         | 1              |         |       |
|                                    | vCPU \[cores\] | 0.5     | 0.5   |
|                                    | Mem \[GB\]     | 0.8     | 0.8   |
| # webapp                           | 2              |         |       |
|                                    | vCPU \[cores\] | 0.5     | 0.5   |
|                                    | Mem \[GB\]     | 0.8     | 0.8   |
| **Elasticsearch/OpenSearch**       |                |         |       |
| # statefulset                      | 2              |         |       |
|                                    | vCPU \[cores\] | 1       | 1     |
|                                    | Mem \[GB\]     | 1.5     | 1.5   |
|                                    | Disk \[GB\]    | 32      | 128   |
| **Other** (Worker, Analytics, ...) |                |         |       |
| #                                  | 1              |         |       |
|                                    | vCPU \[cores\] | 0.2     | 0.2   |
|                                    | Mem \[GB\]     | 0.3     | 0.3   |

</TabItem>
<TabItem value="withoutOptimize">

:::note
This cluster can serve roughly 65 tasks per second as a peak load, and it can store up to 100,000 process instances in Elasticsearch/OpenSearch (in-flight and history) before running out of disk space. Without Optimize, you save CPU, memory, and disk resources, as the Optimize importer is not running and Elasticsearch/OpenSearch does not need to store Optimize data.
:::

|                                    |                | request | limit |
| ---------------------------------- | -------------- | ------- | ----- |
| **Orchestration cluster**          |                |         |       |
| \# brokers                         | 3              |         |       |
| \# partitions                      | 3              |         |       |
| replication factor                 | 3              |         |       |
|                                    | vCPU \[cores\] | 1       | 2     |
|                                    | Mem \[GB\]     | 2       | 3     |
|                                    | Disk \[GB\]    | 32      | 128   |
| **Connectors**                     |                |         |       |
| #                                  | 1              |         |       |
|                                    | vCPU \[cores\] | 0.2     | 0.2   |
|                                    | Mem \[GB\]     | 0.512   | 1     |
| **Elasticsearch/OpenSearch**       |                |         |       |
| # statefulset                      | 2              |         |       |
|                                    | vCPU \[cores\] | 1       | 1     |
|                                    | Mem \[GB\]     | 1.5     | 1.5   |
|                                    | Disk \[GB\]    | 32      | 128   |
| **Other** (Worker, Analytics, ...) |                |         |       |
| #                                  | 1              |         |       |
|                                    | vCPU \[cores\] | 0.2     | 0.2   |
|                                    | Mem \[GB\]     | 0.3     | 0.3   |

</TabItem>
</Tabs>

## Planning non-production environments

All clusters can be used for development, testing, integration, Q&A, and production. In Camunda 8 SaaS, production and test environments are organized via separate organizations within Camunda 8 to ease the management of clusters, while also minimizing the risk of accidentally accessing a production cluster.

Note that functional unit tests that are written in Java and use [zeebe-process-test](https://github.com/camunda-cloud/zeebe-process-test/) will use an in-memory broker in unit tests, so no development cluster is needed for this use case.

For typical integration or functional test environments, you can normally deploy a small cluster, like the one shown above, even if your production environment is sized bigger. This is typically sufficient, as functional tests typically run much smaller workloads.

Load or performance tests ideally run on the same sizing configuration as your production instance to yield reliable results.

A typical customer setup consists of:

- 1 Production cluster
- 1 Integration or pre-prod cluster (equal in size to your anticipated production cluster if you want to run load tests or benchmarks)
- 1 Test cluster
- Multiple developer clusters

Ideally, every active developer runs their own cluster, so that the workflow engine does not need to be shared among developers. Otherwise, clusters are not isolated, which can lead to errors if, for example, developer A deploys a new version of the same process as developer B. Typically, developer clusters can be deleted when they are no longer used, as no data needs to be kept, so you might not need one cluster per developer that works with Camunda 8 at some point in time. Using in-memory unit tests further reduces the contention on developer clusters.

However, some customers do share a Camunda 8 cluster among various developers for economic reasons. This can work well if everybody is aware of the problems that can arise.

## Running experiments and benchmarks

The sizing recommendations in this guide are a starting point. Every workload is different, and the best way to determine the right sizing for your environment is to **run your own benchmarks** with a representative workload.

We recommend running benchmarks in the following situations:

- You exceed three million process instances per day.
- Your process models are complex or have large payloads.
- Low latency is a critical requirement.
- You want to validate your sizing before going into production.

### Using the Camunda 8 benchmark project

The [Camunda 8 benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) is an open-source tool you can use to run load tests against your own Camunda 8 cluster. It allows you to:

- Simulate realistic workloads with configurable throughput.
- Use the same [realistic process model](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) used to generate the sizing numbers in this guide, or supply your own process model.
- Measure throughput, latency, and resource utilization under load.
- Compare results with the sizing tables above to validate your configuration.

To get started:

1. Clone the [benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark).
2. Configure it to point to your Camunda 8 cluster (SaaS or Self-Managed).
3. Select or create a process model that represents your expected workload.
4. Run the benchmark and observe the results to determine if your cluster size is appropriate.

Refer to the [benchmark project README](https://github.com/camunda-community-hub/camunda-8-benchmark#readme) for detailed setup and usage instructions.
