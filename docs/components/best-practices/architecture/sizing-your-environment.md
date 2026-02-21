---
id: sizing-your-environment
title: Size your environment
tags:
  - Database
  - Performance
  - Hardware
  - Sizing
description: "Size your Camunda 8 environment by understanding the factors that influence it, including throughput, latency, payload size, and scalability behavior, among others."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Size your Camunda 8 environment by understanding the factors that influence it, including throughput, latency, payload size, and scalability behavior, among others.

After that, you’ll be able to select the appropriate Camunda 8 SaaS hardware package or size your Self-Managed Kubernetes cluster.

## Understand influencing factors

### Throughput

Throughput defines, how many process instances can be executed within a certain timeframe.

It is typically easy to estimate the number of **process instances per day** you need to execute. If you only know the number of process instances per year, divide it by 250 (average number of working days in a year).

However, hardware sizing depends more on the **number of BPMN tasks** in a process model. For example, processes with one service task usually achieve much higher throughput than processes with 30 service tasks.

If you already know your future process model, use it to count the number of tasks in the process. For example, the following onboarding process contains five service tasks in a typical execution.

<div bpmn="best-practices/sizing-your-environment-assets/customer_onboarding.bpmn" callouts="task1,task2,task3,task4,task5" />

If you don't yet know the number of service tasks, assume 10 service tasks as a rule of thumb.

The number of tasks per process allows you to calculate the required number of **tasks per day (tasks/day)**, which can also be converted into **tasks per second (tasks/s)** by dividing by 24 hours \* 60 minutes \* 60 seconds.

#### Example

| Indicator                          |    Number | Calculation method | Comment                                     |
| :--------------------------------- | --------: | :----------------: | :------------------------------------------ |
| Onboarding instances per year      | 5,000,000 |                    | Business input                              |
| Process instances per business day |    20,000 |       / 250        | average number of working days in a year    |
| Tasks per day                      |   100,000 |        \* 5        | Tasks in the process model as counted above |
| Tasks per second                   |      1.16 |   / (24\*60\*60)   | Seconds per day                             |

In most cases, throughput is defined per day, as this timeframe is easier to understand. However, in high-performance use cases, you may need to define the throughput per second.

### Peak loads

In most scenarios, load is volatile rather than constant. For example, a company might start 90% of its monthly process instances on a single day of the month. The **ability to handle these peaks is the more crucial requirement and should drive the decision**, rather than the average load.

In the example above, the peak day defines the overall throughput requirements.

In some cases, planning for peak load also means focusing on a shorter time window, such as eight business hours, or even the busiest two hours of the day, depending on the typical workload.

### Latency and cycle time

In some use cases, the cycle time of a process (or even individual tasks) matters. For example, a REST endpoint might start a process instance to calculate a customer score. The process executes four service tasks, but the request must return synchronously within 250 milliseconds.

While service task cycle time depends on the work performed in each task, the workflow engine overhead itself can be measured. In an experiment with Camunda 8 1.2.4, with all worker code running in the same GCP zone as Camunda 8, measured overhead was about 10 ms per process node and about 50 ms of latency for service tasks handled by remote workers. As a result, executing four service tasks adds roughly 240 ms of workflow engine overhead.

The closer throughput gets to the cluster’s limits, the higher latency becomes, because requests compete for hardware resources (especially disk writes). When cycle time and latency are important, plan for sufficient headroom and avoid running the cluster near full utilization to prevent latency spikes from resource contention.

:::tip
As a rule of thumb, size for 20× the average load to accommodate peaks and keep latency low.
:::

| Indicator                                                      |    Number | Calculation method | Comment                                                                                 |
| :------------------------------------------------------------- | --------: | :----------------: | :-------------------------------------------------------------------------------------- |
| Onboarding instances per year                                  | 5,000,000 |                    | Business input, but irrelevant                                                          |
| Expected process instances on peak day                         |   150,000 |                    | Business input                                                                          |
| Process instances per second within business hours on peak day |      5.20 |   / (8\*60\*60)    | Only looking at seconds of the 8 business hours of a day                                |
| Process instances per second including buffer                  |    104.16 |       \* 20        | Adding some buffer is recommended in critical high-performance or low-latency use cases |

### Payload size

Every process instance can hold a payload (known as [process variables](/components/concepts/variables.md)). The runtime workflow engine must manage the payload of all running process instances, and the data for both running and completed process instances is also forwarded to Operate and Optimize.

The data you attach to a process instance (process variables) influences resource requirements. For example, it makes a big difference if you only add one or two strings (requiring around 1 KB of space) to your process instances, or a full JSON document containing 1 MB. Hence, the payload size is an important factor when looking at sizing.

The data attached to a process instance affects resource requirements. For example, there is a significant difference between storing one or two strings (around one KB) and storing a full JSON document of one MB. Therefore, payload size is an important sizing factor.

There are a few general rules regarding payload size:

- The maximum [variable size per process instance is limited](/components/concepts/variables.md#variable-size-limitation), currently to roughly three MB.
- Storing large amounts of data in the process context is not recommended. See [Best practices on handling data in processes](/components/best-practices/development/handling-data-in-processes.md).
- Each [partition](/components/zeebe/technical-concepts/partitions.md) in a Zeebe installation can typically handle up to one GB of total payload. Larger payloads can slow down processing. For example, running one million process instances with four KB of data each results in about 3.9 GB of data, so at least four partitions are needed. In practice, this often means six partitions, because the number of partitions is typically configured as a multiple of the replication factor (three by default).

Payload size also affects disk space requirements. See [Disk space](#disk-space) for more details.

### Disk space

The workflow engine stores data for every process instance, especially to keep the current state persistent. This is unavoidable. If user tasks are involved, data is also sent to Tasklist and kept there until the tasks are completed.

Furthermore, data is also sent from Operate and Optimize, which store data in Elasticsearch. These tools keep historical audit data for the configured retention times. The total amount of disk space can be reduced by using **data retention settings**. We typically delete data in Operate after 30 to 90 days, but keep it in Optimize for a longer period of time to allow more analysis. A good rule of thumb is something between 6 and 18 months.

:::note
Elasticsearch needs enough memory available to load a large amount of this data into memory.
:::

Assuming a [typical payload of 15 process variables (simple strings, numbers or booleans)](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/typical_payload.json), Camunda measured the following approximate disk space requirements using Camunda 8 SaaS 1.2.4. These are not exact numbers, but they can help you estimate what to expect:

- Zeebe: 75 kb / PI
- Operate: 57 kb / PI
- Optimize: 21 kb / PI
- Tasklist: 21 kb / PI
- Sum: 174 kb / PI

Using your throughput and retention settings, you can now calculate the required disk space for your scenario. Example:

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

### Scalability

Running a Camunda 8 cluster means operating multiple components that all require resources, such as the Zeebe broker, Elasticsearch (the database for Operate, Tasklist, and Optimize), and the Operate, Tasklist, and Optimize applications themselves. These components run in a clustered setup to provide high availability, fault tolerance, and resilience.

Zeebe scales horizontally by adding more cluster nodes (pods). However, scaling is **limited by the configured number of [partitions](/components/zeebe/technical-concepts/partitions.md)**, because work within a single partition cannot be parallelized by design. Therefore, you must configure enough partitions to fully utilize your hardware. The **[number of partitions can be scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) after the cluster is initially provisioned**, but not yet scaled down.

If you expect load to grow over time, configure more partitions than you need today as a buffer. For example, four times your current requirement. This typically has only a small impact on performance.

Camunda 8 runs on Kubernetes, and each component runs as a pod with assigned resources. You can also scale resources vertically (increase or decrease CPU and memory) within limits, but vertical scaling doesn’t always increase throughput because components depend on each other. In general, start with the minimal hardware package described below and adjust based on benchmarks.

Camunda licensing does not depend on the provisioned hardware resources, so you can size according to your needs.

## Size your runtime environment

To size your Camunda 8 environment, first calculate your requirements.
Once defined, select a hardware package that meets them.

<Tabs groupId="environment" defaultValue="saas" values={
[
{ label: 'SaaS', value: 'saas', },
{ label: 'Self-Managed', value: 'self-managed', },
]}>

<TabItem value="saas">

Camunda 8 defines four [cluster sizes](/components/concepts/clusters.md#cluster-size) to choose from (1x, 2x, 3x, and 4x) after you have chosen your [cluster type](/components/concepts/clusters.md#cluster-type). The following table gives you an indication of the requirements each cluster size can support.

:::important
Contact your Customer Success Manager to increase the cluster size beyond the maximum 4x size. This requires custom sizing and pricing.
:::

| Cluster size                                                                        |                                  1x |                                  2x |                               3x |                               4x |
| :---------------------------------------------------------------------------------- | ----------------------------------: | ----------------------------------: | -------------------------------: | -------------------------------: |
| Max Throughput **Tasks/day** **\***                                                 |                                 9 M |                                18 M |                             27 M |                             36 M |
| Max Throughput **Tasks/second** **\***                                              |                                 100 |                                 200 |                              300 |                              400 |
| Max Throughput **Process Instances/second** **\*\***                                |                                   5 |                                  10 |                               15 |                               20 |
| Max Total Number of Process Instances stored (in Elasticsearch in total) **\*\*\*** |                               200 k |                               400 k |                            600 k |                            800 k |
| Approximate resources provisioned **\*\*\*\***                                      | 11 vCPU, 22 GB memory, 192 GB disk. | 22 vCPU, 44 GB memory, 384 GB disk. | 33 vCPU, 66 GB mem, 576 GB disk. | 44 vCPU, 88 GB mem, 768 GB disk. |

The numbers in the table were measured using Camunda 8 (version 8.8), [the
benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) running on its own Kubernetes Cluster, and using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) containing a mix of BPMN symbols such as tasks, events and call activities including subprocesses. To calculate day-based metrics, an equal distribution over 24 hours is assumed.

**\*** Tasks (Service Tasks, Send Tasks, User Tasks, and so on) completed per day is the primary metric, as this is easy to measure and has a strong influence on resource consumption. This number assumes a constant load over the day. Tasks/day and Tasks/ second are scaled linearly.

**\*\*** As Tasks are the primary resource driver, the number of process instances supported by a cluster is calculated based on the assumption of an average of 10 tasks per process. Customers can calculate a more accurate process instance estimate using their anticipated number of tasks per process.

**\*\*\*** Max total number of historical process instances within the retention period. For active process instances this is limited mostly by the Zeebe resources and for historical instances by Elasticsearch resources. Calculated assuming a typical set of process variables for process instances. Note that it makes a difference if you add one or two strings (requiring ~ 1kb of space) to your process instances, or if you attach a full JSON document containing 1MB, as this data needs to be stored in various places, influencing memory and disk requirements. If this number increases, you can still retain the runtime throughput, but Tasklist, Operate, and/or Optimize may lag behind.
The provisioned disk size is calculated as the sum of the disk size used by Zeebe and Elasticsearch.

The max throughput numbers should be considered as peak loads, and the data retention configuration considered when defining the amount of data kept for completed instances in your cluster. See [Camunda 8 SaaS data retention](/components/saas/data-retention.md) for the default retention times for Zeebe, Tasklist, Operate and Optimize.

- If process instances are completed and older than the configured retention time of an application, the data is removed.
- If a process instance is older than the configured retention time but still active and incomplete, it is fully functioning in runtime and is _not_ removed.

Data retention can be adjusted by Camunda on request (up to certain limits). You should consider retention time adjustments and/or storage capacity increases if you plan to run more than [max PI stored in ES]/ [configured retention time].

**\*\*\*\*** These are the resource limits configured in the Kubernetes cluster and are always subject to change.

:::note
Why is the total number of process instances stored that low? This is related to limited resources provided to Elasticsearch, yielding performance problems with too much data stored there. By increasing the available memory to Elasticsearch you can also increase that number. At the same time, even with this rather low number, you can always guarantee the throughput of the core workflow engine during peak loads, as this performance is not influenced. Also, you can always increase memory for Elasticsearch later on if it is required.
:::

</TabItem>

<TabItem value="self-managed">

Provisioning Camunda 8 on a Self-Managed Kubernetes cluster can depend on various factors. For example, many customers already have teams that provide Elasticsearch as a service.

However, the following example shows a possible configuration that is close to a 1x Camunda 8 SaaS cluster and can serve as a starting point for sizing.

:::note
Such a cluster can handle roughly 65 tasks per second at peak load and can store up to 100,000 process instances in Elasticsearch (in-flight and historical) before running out of disk space.
:::

|                                    |                     | request | limit |
| ---------------------------------- | ------------------- | ------- | ----- |
| **Orchestration cluster**          |                     |         |       |
| \# brokers                         | 3                   |         |       |
| \# partitions                      | 3                   |         |       |
| replication factor                 | 3                   |         |       |
|                                    | vCPU \[cores\]      | 1       | 2     |
|                                    | Mem \[GB\]          | 2       | 3     |
|                                    | Disk \[GB\]         | 32      | 128   |
| **Connectors**                     |                     |         |       |
| #                                  | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.2     | 0.2   |
|                                    | Mem \[GB\] limit    | 0.512   | 1     |
| **Optimize**                       |                     |         |       |
| #importer                          | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.5     | 0.5   |
|                                    | Mem \[GB\] limit    | 0.8     | 0.8   |
| #webapp                            | 2                   |         |       |
|                                    | vCPU \[cores\]      | 0.5     | 0.5   |
|                                    | Mem \[GB\] limit    | 0.8     | 0.8   |
| **Elastic**                        |                     |         |       |
| #statefulset                       | 2                   |         |       |
|                                    | vCPU \[cores\]      | 1       | 1     |
|                                    | Mem \[GB\] limit    | 1.5     | 1.5   |
|                                    | Disk \[GB\] request | 32      | 128   |
| **Other** (Worker, Analytics, ...) |                     |         |       |
| #                                  | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.2     | 0.2   |
|                                    | Mem \[GB\] limit    | 0.3     | 0.3   |

</TabItem>
</Tabs>

## Plan non-production environments

All clusters can be used for development, testing, integration, Q&A, and production. In Camunda 8 SaaS, production and test environments are typically separated into different organizations to simplify cluster management and reduce the risk of accidentally accessing a production cluster.

Functional unit tests written in Java using [zeebe-process-test](https://github.com/camunda-cloud/zeebe-process-test/) run with an in-memory broker, so no development cluster is required for this use case.

For most integration or functional test environments, a small cluster (like the one shown above) is usually sufficient, even if the production environment is larger, because test workloads are typically much smaller.

:::tip
Load and performance tests should ideally run on the same sizing configuration as production to produce reliable results.
:::

A typical customer setup includes:

- A production cluster.
- An integration or pre-production cluster (sized like production if running load tests or benchmarks).
- A test cluster.
- Multiple developer clusters.

Ideally, each active developer has their own cluster so the workflow engine isn’t shared. Shared clusters are not isolated and can lead to issues. For example, if two developers deploy different versions of the same process. Developer clusters can usually be deleted when no longer needed, since no data must be retained, and in-memory unit tests further reduce contention.

Some customers share a Camunda 8 cluster across developers for cost reasons. This can work, as long as everyone is aware of the trade-offs.

## Run experiments and benchmarks

If you’re unsure which package to choose, run a load test with a representative workload on the target hardware package. This will help you determine whether the package meets your needs.

:::tip
Camunda recommends this if you exceed three million process instances per day.
:::

Take a look at the [Camunda 8 benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) as a starting point for your own benchmarks.
