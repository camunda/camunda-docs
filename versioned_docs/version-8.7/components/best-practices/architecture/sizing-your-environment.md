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

In order to define and size your environment for Camunda 8 appropriately, you need to understand the factors that influence hardware requirements. Then you can apply this knowledge to select the appropriate Camunda 8 SaaS hardware package or size your self-managed Kubernetes cluster.

:::caution Camunda 8 only
This best practice targets Camunda 8 only! If you are looking at Camunda 7, please visit [Sizing your Camunda 7 environment](../sizing-your-environment-c7/).
:::

## Understanding influencing factors

Let's understand the important numbers.

### Throughput

Throughput defines, how many process instances can be executed in a certain timeframe.

It is typically easy to estimate the number of **process instances per day** you need to execute. If you only know the number of process instances per year, we recommend to divide this number by the 250 (average number of working days in a year).

But the hardware sizing depends more on the **number of BPMN tasks** in a process model. For example, you will have a much higher throughput for processes with one service task than for processes with 30 service tasks.

If you already know your future process model, you can use this to count the number of tasks for your process. For example, the following onboarding process contains five service tasks in a typical execution.

<div bpmn="best-practices/sizing-your-environment-assets/customer_onboarding.bpmn" callouts="task1,task2,task3,task4,task5" />

If you don't yet know the number of service tasks, we recommend to assume 10 service tasks as a rule of thumb.

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

Sometimes, looking at peaks might also mean, that you are not looking at all 24 hours of a day, but only 8 business hours, or probably the busiest 2 hours of a day, depending on your typical workload.

### Latency and cycle time

In some use cases, the cycle time of a process (or sometimes even the cycle time of single tasks) matter. For example, you want to provide a REST endpoint, that starts a process instance to calculate a score for a customer. This process needs to execute four service tasks, but the REST request should return a response synchronously, no later than 250 milliseconds after the request.

While the cycle time of service tasks depends very much on what you do in these tasks, the overhead of the workflow engine itself can be measured. In an experiment with Camunda 8 1.2.4, running all worker code in the same GCP zone as Camunda 8, we measured around 10ms processing time per process node and approximately 50 ms latency to process service tasks in remote workers. Hence, to execute 4 service tasks results in 240 ms workflow engine overhead.

The closer you push throughput to the limits, the more latency you will get. This is basically, because the different requests compete for hardware resources, especially disk write operations. As a consequence, whenever cycle time and latency matters to you, you should plan for hardware buffer to not utilize your cluster too much. This makes sure, your latency does not go up because of resource contention. A good rule of thumb is to multiply your average load by 20. This means, you cannot only accommodate unexpected peak loads, but also have more free resources on average, keeping latency down.

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

### Disk space

The workflow engine itself will store data along every process instance, especially to keep the current state persistent. This is unavoidable. In case there are user tasks, data is also sent to Tasklist and kept there, until tasks are completed.

Furthermore, data is also sent from Operate and Optimize, which store data in Elasticsearch. These tools keep historical audit data for the configured retention times. The total amount of disk space can be reduced by using **data retention settings**. We typically delete data in Operate after 30 to 90 days, but keep it in Optimize for a longer period of time to allow more analysis. A good rule of thumb is something between 6 and 18 months.

:::note
Elasticsearch needs enough memory available to load a large amount of this data into memory.
:::

Assuming a [typical payload of 15 process variables (simple strings, numbers or booleans)](https://github.com/camunda/camunda/blob/main/zeebe/benchmarks/project/src/main/resources/bpmn/typical_payload.json) we measured the following approximations for disk space requirements using Camunda 8 SaaS 1.2.4. Please note, that these are not exact numbers, but they might give you an idea what to expect:

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

## Understanding sizing and scalability behavior

Spinning up a Camunda 8 Cluster means you run multiple components that all need resources in the background, like the Zeebe Broker, Elasticsearch (as the database for Operate, Tasklist, and Optimize), Operate, Tasklist, and Optimize. All those components need to be equipped with resources.

All components are clustered to provide high-availability, fault-tolerance and resiliency.

Zeebe scales horizontally by adding more cluster nodes (pods). This is **limited by the [number of partitions](/components/zeebe/technical-concepts/partitions.md)** configured for a Zeebe cluster, as the work within one partition cannot be parallelized by design. Hence, you need to define enough partitions to utilize your hardware. The **number of partitions cannot be changed after the cluster was initially provisioned** (at least not yet), elastic scalability of partitions is not yet possible.

If you anticipate the load increasing over time, prepare by configuring more partitions than you currently need as a buffer. For example, you could multiply the number of partitions you need for your current load by four to add a buffer. This typically has just a small impact on performance.

Camunda 8 runs on Kubernetes. Every component is operated as a so-called pod, that gets resources assigned. These resources can be vertically scaled (=get more or less hardware resources assigned dynamically) within certain limits. Note that vertically scaling not always results in more throughput, as the various components have dependencies on each other. This is a complex topic and requires running experiments with benchmarks. In general, we recommend to start with the minimalistic hardware package as described below. If you have further requirements, you use this as a starting point to increase resources.

Note that Camunda licensing does not depend on the provisioned hardware resources, making it easy to size according to your needs.

## Sizing your runtime environment

First, calculate your requirements using the information provided above, taking the example calculations from above:

- Throughput: 20,000 process instances / day
- Disk space: 114 GB

Now you can select a hardware package that can cover these requirements. In this example this fits well into a cluster of size 2x.

### Camunda 8 SaaS

Camunda 8 defines four [cluster sizes](/components/concepts/clusters.md#cluster-size) you can select from (1x, 2x, 3x, and 4x) after you have chosen your [cluster type](/components/concepts/clusters.md#cluster-type). The following table gives you an indication of what requirements you can fulfill with each cluster size.

:::note
Contact your Customer Success Manager to increase the cluster size beyond the maximum 4x size. This requires custom sizing and pricing.
:::

| Cluster size                                                                        |                                  1x |                                  2x |                               3x |                               4x |
| :---------------------------------------------------------------------------------- | ----------------------------------: | ----------------------------------: | -------------------------------: | -------------------------------: |
| Max Throughput **Tasks/day** **\***                                                 |                                 9 M |                                18 M |                             27 M |                             36 M |
| Max Throughput **Tasks/second** **\***                                              |                                 100 |                                 200 |                              300 |                              400 |
| Max Throughput **Process Instances/second** **\*\***                                |                                   5 |                                  10 |                               15 |                               20 |
| Max Total Number of Process Instances stored (in Elasticsearch in total) **\*\*\*** |                                75 k |                               150 k |                            225 k |                            300 k |
| Approximate resources provisioned **\*\*\*\***                                      | 11 vCPU, 22 GB memory, 192 GB disk. | 22 vCPU, 44 GB memory, 384 GB disk. | 33 vCPU, 66 GB mem, 576 GB disk. | 44 vCPU, 88 GB mem, 768 GB disk. |

The numbers in the table were measured using Camunda 8 (version 8.6), [the benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) running on its own Kubernetes Cluster, and using a [realistic process](https://github.com/camunda/camunda/blob/main/zeebe/benchmarks/project/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) containing a mix of BPMN symbols such as tasks, events and call activities including subprocesses. To calculate day-based metrics, an equal distribution over 24 hours is assumed.

**\*** Tasks (Service Tasks, Send Tasks, User Tasks, and so on) completed per day is the primary metric, as this is easy to measure and has a strong influence on resource consumption. This number assumes a constant load over the day. Tasks/day and Tasks/ second are scaled linearly.

**\*\*** As Tasks are the primary resource driver, the number of process instances supported by a cluster is calculated based on the assumption of an average of 10 tasks per process. Customers can calculate a more accurate process instance estimate using their anticipated number of tasks per process.

**\*\*\*** Total number of process instances within the retention period, regardless of if they are active or finished. This is limited by disk space, CPU, and memory for running and historical process instances available to ElasticSearch. Calculated assuming a typical set of process variables for process instances. Note that it makes a difference if you add one or two strings (requiring ~ 1kb of space) to your process instances, or if you attach a full JSON document containing 1MB, as this data needs to be stored in various places, influencing memory and disk requirements. If this number increases, you can still retain the runtime throughput, but Tasklist, Operate, and/or Optimize may lag behind.
The provisioned disk size is calculated as the sum of the disk size used by Zeebe and Elasticsearch.

The max throughput numbers should be considered as peak loads, and the data retention configuration considered when defining the amount of data kept for completed instances in your cluster. See [Camunda 8 SaaS data retention](/components/concepts/data-retention.md) for the default retention times for Zeebe, Tasklist, Operate and Optimize.

- If process instances are completed and older than the configured retention time of an application, the data is removed.
- If a process instance is older than the configured retention time but still active and incomplete, it is fully functioning in runtime and is _not_ removed.

Data retention can be adjusted by Camunda on request (up to certain limits). You should consider retention time adjustments and/or storage capacity increases if you plan to run more than [max PI stored in ES]/ [configured retention time].

**\*\*\*\*** These are the resource limits configured in the Kubernetes cluster and are always subject to change.

:::note
Why is the total number of process instances stored that low? This is related to limited resources provided to Elasticsearch, yielding performance problems with too much data stored there. By increasing the available memory to Elasticsearch you can also increase that number. At the same time, even with this rather low number, you can always guarantee the throughput of the core workflow engine during peak loads, as this performance is not influenced. Also, you can always increase memory for Elasticsearch later on if it is required.
:::

### Camunda 8 Self-Managed

Provisioning Camunda 8 onto your Self-Managed Kubernetes cluster might depend on various factors. For example, most customers already have their own teams providing Elasticsearch for them as a service.

However, the following example shows a possible configuration which is close to a cluster of size 1x in Camunda 8 SaaS, which can serve as a starting point for your own sizing.

:::note
Such a cluster can serve roughly 65 tasks per second as a peak load, and it can store up to 100,000 process instances in Elasticsearch (in-flight and history) before running out of disk-space.
:::

|                                    |                     | request | limit |
| ---------------------------------- | ------------------- | ------- | ----- |
| **Zeebe**                          |                     |         |       |
| \# brokers                         | 3                   |         |       |
| \# partitions                      | 3                   |         |       |
| replication factor                 | 3                   |         |       |
|                                    | vCPU \[cores\]      | 0.8     | 0.96  |
|                                    | Mem \[GB\]          | 2       | 4     |
|                                    | Disk \[GB\]         | 32      | 192   |
| gateway                            | embedded in broker  |         |       |
| **Operate**                        |                     |         |       |
| #importer                          | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.3     | 1     |
|                                    | Mem \[GB\] limit    | 0.2     | 1     |
| #webapp                            | 2                   |         |       |
|                                    | vCPU \[cores\]      | 0.3     | 1     |
|                                    | Mem \[GB\] limit    | 0.2     | 1     |
| **Tasklist**                       |                     |         |       |
| #importer                          | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.3     | 1     |
|                                    | Mem \[GB\] limit    | 0.2     | 1     |
| #webapp                            | 2                   |         |       |
|                                    | vCPU \[cores\]      | 0.3     | 1     |
|                                    | Mem \[GB\] limit    | 0.2     | 2     |
| **Optimize**                       |                     |         |       |
| #importer                          | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.3     | 1     |
|                                    | Mem \[GB\] limit    | 0.4     | 1     |
| #webapp                            | 2                   |         |       |
|                                    | vCPU \[cores\]      | 0.3     | 1     |
|                                    | Mem \[GB\] limit    | 0.4     | 1     |
| **Elastic**                        |                     |         |       |
| #statefulset                       | 1                   |         |       |
|                                    | vCPU \[cores\]      | 1       | 2     |
|                                    | Mem \[GB\] limit    | 3       | 6     |
|                                    | Disk \[GB\] request | 64      | 100   |
| **Connectors**                     |                     |         |       |
| #                                  | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.2     | 0.4   |
|                                    | Mem \[GB\] limit    | 0.25    | 0.5   |
| **Other** (Worker, Analytics, ...) |                     |         |       |
| #                                  | 1                   |         |       |
|                                    | vCPU \[cores\]      | 0.4     | 0.4   |
|                                    | Mem \[GB\] limit    | 0.45    | 0.45  |

## Planning non-production environments

All clusters can be used for development, testing, integration, Q&A, and production. In Camunda 8 SaaS, production and test environments are organized via separate organizations within Camunda 8 to ease the management of clusters, while also minimizing the risk to accidentally accessing a production cluster.

Note that functional unit tests that are written in Java and use [zeebe-process-test](https://github.com/camunda-cloud/zeebe-process-test/), will use an in-memory broker in unit tests, so no development cluster is needed for this use case.

For typical integration or functional test environments, you can normally just deploy a small cluster, like the one shown above, even if your production environment is sized bigger. This is typically sufficient, as functional tests typically run much smaller workloads.

Load or performance tests ideally run on the same sizing configuration as your production instance to yield reliable results.

A typical customer set-up consists of:

- 1 Production cluster
- 1 Integration or pre-prod cluster (equal in size to your anticipated production cluster if you want to run load tests or benchmarks)
- 1 Test cluster
- Multiple developer clusters

Ideally, every active developer runs its own cluster, so that the workflow engine does not need to be shared amongst developers. Otherwise, clusters are not isolated, which can lead to errors if for example developer A deploys a new version of the same process as developer B. Typically, developer clusters can be deleted when they are no longer used, as no data needs to be kept, so you might not need one cluster per developer that works with Camunda 8 at some point in time. And using in-memory unit tests further reduces the contention on developer clusters.

However, some customers do share a Camunda 8 cluster amongst various developers for economic reasons. This can work well if everybody is aware of the problems that can arise.

## Running experiments and benchmarks

If you are in doubt about which package to choose, you can do a load test with a representative workload with the target hardware package. This will help you decide if the specific package can serve your needs.

This is recommended if you exceed the above numbers of three million process instances per day.

Take a look at the [Camunda 8 benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) as a starting point for your own benchmarks.
