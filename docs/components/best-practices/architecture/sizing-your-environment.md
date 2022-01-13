---
title:  Sizing Your Camunda Cloud Environment
stakeholders:
    - Architecture
    - Operations
tags:
    - Database
    - Performance
    - Hardware
    - Sizing
topics:
    - Customer Success Path
weight: 50

booksection: "A. Getting Started"
bookchapter: 5

comment: See https://docs.google.com/spreadsheets/d/1s6TO0rmAhD-eYj69qERbAH3tLTW55mudsV-Ga6QBYb0/edit#gid=0 for example calculation
---

In order to define and size your environment for Camunda Cloud appropriately, you need to understand the factors that influence hardware requirements. Then you can apply this knowledge to select the appropriate Camunda Cloud SaaS hardware package or size your self-managed Kubernetes cluster.

:::caution Camunda Cloud only
This best practice targets Camunda Cloud only! If you are looking at Camunda Plaform, please visit [Sizing your Camunda 7 environment](../sizing-your-environment-c7/).
:::


## Understanding influencing factors

Let's understand the important numbers.

### Throughput 

Throughput defines, how many process instances can be executed in a certain timeframe. 

It is typically easy to estimate the number of **process instances per day** you need to execute. If you only know the number of process instances per year, we recommend to divide this number by the 250 (average number of working days in a year). 

But the hardware sizing depends more on the **number of BPMN tasks** in a process model. For example, you will have a much higher throughput for processes with one service task than for processes with 30 service tasks. 

If you already know your future process model, you can use this to count the number of tasks for your process. For example, the following onboarding process contains five service tasks in a typical execution.

<div bpmn="sizing-your-environment-assets/customer_onboarding.bpmn" callouts="task1,task2,task3,task4,task5" />

If you don't yet know the number of service tasks, we recommend to assume 10 service tasks as a rule of thumb.

The number of tasks per process allows you to calculate the required number of **tasks per day (tasks/day)** which can also be converted into **tasks per second (tasks/s)** (devide by 24 hours \* 60 minutes \* 60 seconds). 


**Example:**

| Indicator | Number | Calculation method | Comment |
| :- |-: | :-: | :- | 
| Onboarding instances per year | 5,000,000 |  | Business input |
| Process instances per business day | 20,000 | / 250 | average number of working days in a year |
| Tasks per day | 4,000 | / 5 | Tasks in the process model as counted above |
| Tasks per second | 0.05 | / (24\*60\*60) | Seconds per day |


### Peak loads

In most scenarios, your load will be volatile and not constant. For example, your company might start 90% of their monthly process instances in the same day of the month. The **ability to handle those peaks is the more crucial requirement and should drive your decision** instead of looking at the average load.

In the above example, that one day with the peak load defines your overall throughput requirements.

In most cases, we define throughput per day, as this time frame is easier to understand. But in high-performance use cases you might need to define the throughput per second. This is especially important if you need to guarantee certain cycle times even within peak loads. The cycle time is the time a process (or sometimes only single tasks) takes to complete. For example, the number of milliseconds a fully automated process with 10 tasks takes.

Your calculation might look different if you have peak loads:

| Indicator | Number | Calculation method | Comment |
| :- |-: | :-: | :- | 
| Onboarding instances per year | 5,000,000 |  | Business input, but irrelevant |
| Expected process instances on peak day | 150,000 |  | Business input |
| Tasks per second within business hours on peak day | 5.20 | / (8\*60\*60) | Only looking at seconds of the 8 business hours of a day |
| Tasks per second including buffer | 52.08 | \* 10 | Adding some buffer (here 10 times the load) is recommended in critical high-performance use cases |

If cycle time matters, you might even plan for more buffer, as the tasks will not be evenly distributed within the 8 business hours. The exact buffer depends on the severity of delays, a good rule of thumb is to plan for 10 times the tasks per second.


### Disk space

The workflow engine itself will store data along every process instance, especially to keep the current state persistent. This is unavoidable. In case there are human tasks, data is also sent to Tasklist and kept there, until tasks are completed. 

Furthermore, data is also sent Operate and Optimize, which store data in Elasticsearch. These tools keep historical audit data for some time. The total amount of disk space can be reduced by using **data retention settings**. We typically delete data in Operate after 30 to 90 days, but keep it in Optimize for a longer period of time to allow more analysis. A good rule of thumb is something between 6 and 18 months.

The data you attach to a process instance (process variables) will influence disk space requirements. For example, it makes a big difference if you only add one or two strings (requiring ~ 1kb of space) to your process instances, or a full JSON document containing 1MB.

Assuming a [typical payload of 15 process variables (simple strings, numbers or booleans)](https://github.com/camunda-cloud/zeebe/blob/develop/benchmarks/project/src/main/resources/bpmn/typical_payload.json) we measured the following approximations for disk space requirements using Camunda Cloud SaaS 1.2.4. Please note, that these are not exact numbers, but they might give you an idea what to expect:

* Zeebe: 25 kb / PI
* Operate: 19 kb / PI
* Optimize: 7 kb / PI
* Tasklist: 7 kb / PI
* Sum: 58 kb / PI

Using your throughput and retention settings, you can now calculate the required disk space for your scenario. Example:

| Indicator  | Calculation method            | Value | Comments |
| :------------------------- | :-----------: | ------------: | :-------------------------------------------------------------------------------------------------- |
| Process instances per day  |             | 20,000        |                                                                                                    |
| **Runtime**                    |             |              |                                                                                                    |
| Typical process cycle time | \* 5 days   | 100,000       | How long is a process instance typically active? Determines the number of active process instances |
| Disk space for Zeebe       | \* 25 kb    | 2.38 GB  | (Converted into GB by / 1024 / 1024)                                                               |
| Disk space for Tasklist    | \* 7 kb     | 0.67 GB |                                                                                                    |
| **Operate**                    |             |              |                                                                                                    |
| PI in retention time             | \* 30 day   | 600,000       |                                                                                                    |
| Disk space                 | \* 19 kb    | 10.87 GB |                                                                                                    |
| **Optimize**                   |             |              |                                                                                                    |
| PI in retention time             | \* 6 months | 3,600,000      |                                                                                                    |
| Disk space                 | \* 7 kb     | 24.03 GB  |                                                                                                    |
| **Sum**                        |             | **37.96 GB**  |                                                                                                    |


## Understanding sizing and scalability behavior

Spinning up a Camunda Cloud Cluster means you run multiple components that all need resources in the background, like the Zeebe broker, Elasticsearch (as the database for Operate, Tasklist, and Optimize), Operate, Tasklist, and Optimize. All those components need to be equiped with resources.

All components are clustered to provide high-availability, fault-tolerance and resiliency. 

Zeebe scales horizontally by adding more cluster nodes (pods). This is limited by the so-called partition size of a Zeebe cluster, as the work within one partition cannot be parallelized by design. Hence, you need to define enough partitions to utilize your cluster or to have some buffer if your load increases later on. The number of partitions cannot be changed after the cluster was initially provisioned (at least not yet), so elastic scalability of cluster nodes is (not yet) possible.

Camunda Cloud runs on Kubernetes. Every component is operated as a so-called pod, that gets resources assigned. These resources can be vertically scaled (=get more or less hardware resources assigned dynamically) within certain limits. Note that vertically scaling not always results in more throughput, as the various components have dependencies on each other. This is a complex topic and requires running experiments with benchmarks. In general, we recommend to start with the minimalistic hardware package as described below. If you have further requirements, you use this as a starting point to increase resources.

Note that Camunda licensing does not depend on the provisioned hardware resources, making it easy to size according to your needs.


## Sizing your runtime environment 

First, calculate your requirements using the information provided above, taking the example calculations from above:

* Throughput: 20,000 process instances / day
* Disk space: 40 GB

Now you can select a hardware package that can cover these requirements. In this example this fits well into a cluster of size S.

### Camunda Cloud SaaS

Camunda Cloud defines three fixed hardware packages you can select from. The table below gives you an indication what requirements you can fullfill with these. If your requirements are above the mentioned numbers, please contact us to discuss a customized sizing.

| **\***                                              | S                               | M                               | L                                |
| :------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------------: |
| Max Throughput **Tasks/day**                 | 1.7 M                           | 19 M                            | 28 M                             |
| Max Throughput **Tasks/second**              | 20                              | 220                             | 320                              |
| Max Throughput **Process Instances/day**     | 0.2 M                           | 1.9 M                           | 3 M                              |
| Max Total Number of Process Instances        | 5.4 M                           | 17 M                            |                                  |
| Typically used for licensing tier **\*\***     | XS, S, M, L, XL                 | XXL                             |                                  |
| Approx resources provisioned **\*\*\***        | 15 vCPU, 20 GB mem, 640 GB disk | 28 vCPU, 50 GB mem, 640 GB disk | 56 vCPU, 85 GB mem, 1320 GB disk |

**\*** The numbers in the table where measured using Camunda Cloud 1.2.4 and [the official benchmark project](https://github.com/camunda-cloud/zeebe/tree/develop/benchmarks). It uses a [ten task process](https://github.com/camunda-cloud/zeebe/blob/develop/benchmarks/project/src/main/resources/bpmn/ten_tasks.bpmn). To calculate day-based metrics, a equal distribution over 24 hours is assumed.


**\*\*** This information tells you, which cluster size you would need to fully utilize your volume tier from your Camunda license. Please note, that this is looking at a load that is distributed evenly over time, your peak loads might still justify a bigger cluster.

**\*\*\***  These are the resource limits configured in the Kubernetes cluster and are always subject to change.


### Camunda Cloud self-managed

Provisioning Camunda Cloud onto your self-managed Kubernetes cluster might depend on various factors. For example, most customes already have own teams providing Elasticsearch for them as a service. 

However, the following example shows the current configuration of a cluster of size S in Camunda Cloud SaaS, which can serve as a starting point for your own sizing. As you can see in the table above, such a cluster can serve 200,000 process instances / day and store up to 5.4 million process instances.



![Sizing Table](sizing-your-environment-assets/sizing-camunda-cloud.png)


## Planning non-production environments

All clusters can be used for development, testing, integration, Q&A, and production. 

Note that functional unit tests that are written in Java and use [zeebe-proces-test](https://github.com/camunda-cloud/zeebe-process-test/), will use an in-memory broker in unit tests, so no development cluster is needed for this use case. 

For typical integration or functional test environments, you can normally just deploy a small cluster, like the one shown above, even if your production environment is sized bigger. This is typically sufficient, as functional tests typically run much smaller workloads.

Load or performance tests ideally run on the same sizing configuration as your production instance to yield reliable results. 

A typical customer set-up consists of: 

* 1 Production cluster
* 1 Integration or pre-prod cluster (equal in size to your anticipated production cluster if you want to run load tests or benchmarks)
* 1 Test cluster 
* Multiple developer clusters

Ideally, every active developer runs its own cluster, so that the workflow engine does not need to be shared amongst developers. Otherwise clusters are not isolated, which can lead to errors if for example developer A deploys a new version of the same process as developer B. Typically, developer clusters can be deleted when they are no longer used, as no data needs to be kept, so you might not need one cluster per developer that works with Camunda Cloud at some point in time. And using in-memory unit tests further reduces the contention on developer clusters. 

However, some customers do share a Camunda Cloud cluster amongst various developers for economic reasons. This can work well if everybody is aware of the problems that can arise.

## Running experiments and benchmarks

If you are in doubt about which package to choose, you can do a load test with a representative workload with the target hardware package. This will help you decide if the specific package can serve your needs. 

This is recommended if you exceed the above numbers of three million process instances per day.

You can look at the [Zeebe benchmark project](https://github.com/camunda-cloud/zeebe/blob/develop/benchmarks/setup/README.md#benchmarking-camunda-cloud-saas). While this project will not run out-of-the-box (e.g. you need need to build starter and worker code yourself and use self-created docker images), you can use it as a starting point for own endavours.

