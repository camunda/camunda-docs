---
id: sizing-saas
title: SaaS cluster sizing
tags:
  - Performance
  - Hardware
  - Sizing
  - SaaS
description: "Select the right Camunda 8 SaaS cluster size based on your throughput and storage requirements."
---

:::tip Audience
This page helps you choose the right Camunda 8 SaaS cluster size. For background on the factors that drive sizing, see [Sizing overview](sizing-your-environment.md).
:::

Use the tables below to select a cluster size. First, calculate your throughput and storage requirements using the guidance in the [Sizing overview](sizing-your-environment.md), then find the cluster size that meets your needs.

Camunda 8 defines four [cluster sizes](/components/concepts/clusters.md#cluster-size) you can select from (1x, 2x, 3x, and 4x) after you have chosen your [cluster type](/components/concepts/clusters.md#cluster-type).

:::note
Contact your Customer Success Manager to increase the cluster size beyond the maximum 4x size. This requires custom sizing and pricing.
:::

## Sizing tables

### Without Optimize

<!-- TODO: Fill in "without Optimize" benchmark data from 8.9 benchmarks. Expected throughput is 25–50% higher than the "with Optimize" numbers below, since Optimize export and import load is removed. -->

| Cluster size                                         |            1x |            2x |            3x |            4x |
| :--------------------------------------------------- | ------------: | ------------: | ------------: | ------------: |
| Max Throughput **Tasks/day** **\***                  | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Max Throughput **Tasks/second** **\***               | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Max Throughput **Process Instances/second** **\*\*** | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Max Total Number of PI stored (in ES) **\*\*\***     | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Approximate resources provisioned **\*\*\*\***       | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### With Optimize

| Cluster size                                         |                              1x |                              2x |                              3x |                              4x |
| :--------------------------------------------------- | ------------------------------: | ------------------------------: | ------------------------------: | ------------------------------: |
| Max Throughput **Tasks/day** **\***                  |                             9 M |                            18 M |                            27 M |                            36 M |
| Max Throughput **Tasks/second** **\***               |                             100 |                             200 |                             300 |                             400 |
| Max Throughput **Process Instances/second** **\*\*** |                               5 |                              10 |                              15 |                              20 |
| Max Total Number of PI stored (in ES) **\*\*\***     |                           200 k |                           400 k |                           600 k |                           800 k |
| Approximate resources provisioned **\*\*\*\***       | 11 vCPU, 22 GB mem, 192 GB disk | 22 vCPU, 44 GB mem, 384 GB disk | 33 vCPU, 66 GB mem, 576 GB disk | 44 vCPU, 88 GB mem, 768 GB disk |

<!-- TODO: Validate "with Optimize" numbers against 8.9 benchmarks. The numbers above were measured with Camunda 8.8. Also confirm whether the "max throughput" boundary condition is defined as backpressure < 10% and p99 process duration < 1s, or another SLO. -->

:::note
The numbers in the tables were measured using Camunda 8 (version 8.8), [the benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) running on its own Kubernetes cluster, and using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) with a [realistic payload](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB, containing a mix of BPMN symbols such as tasks, events, call activities, multi-instance, sub-processes, and DMN). To calculate day-based metrics, an equal distribution over 24 hours is assumed.
:::

## Footnotes

**\*** Tasks (Service Tasks, Send Tasks, User Tasks, and so on) completed per day is the primary metric, as this is easy to measure and has a strong influence on resource consumption. This number assumes a constant load over the day. Tasks/day and Tasks/second are scaled linearly.

**\*\*** As tasks are the primary resource driver, the number of process instances supported by a cluster is calculated based on the assumption of an average of 10 tasks per process. Customers can calculate a more accurate process instance estimate using their anticipated number of tasks per process.

**\*\*\*** Max total number of historical process instances within the retention period. For active process instances this is limited mostly by the Zeebe resources and for historical instances by Elasticsearch resources. Calculated assuming a typical set of process variables for process instances. Note that it makes a difference if you add one or two strings (requiring ~1 KB of space) to your process instances, or if you attach a full JSON document containing 1 MB, as this data needs to be stored in various places, influencing memory and disk requirements. If this number increases, you can still retain the runtime throughput, but Tasklist, Operate, and/or Optimize may lag behind.
The provisioned disk size is calculated as the sum of the disk size used by Zeebe and Elasticsearch.

**\*\*\*\*** These are the resource limits configured in the Kubernetes cluster and are always subject to change.

## Data retention

The max throughput numbers should be considered as peak loads, and the data retention configuration considered when defining the amount of data kept for completed instances in your cluster. See [Camunda 8 SaaS data retention](/components/saas/data-retention.md) for the default retention times for Zeebe, Tasklist, Operate, and Optimize.

- If process instances are completed and older than the configured retention time of an application, the data is removed.
- If a process instance is older than the configured retention time but still active and incomplete, it is fully functioning in runtime and is _not_ removed.

Data retention can be adjusted by Camunda on request (up to certain limits). You should consider retention time adjustments and/or storage capacity increases if you plan to run more than \[max PI stored in ES\] / \[configured retention time\].

:::note Why is the total number of process instances stored that low?
This is related to limited resources provided to Elasticsearch, yielding performance problems with too much data stored there. By increasing the available memory to Elasticsearch you can also increase that number. At the same time, even with this rather low number, you can always guarantee the throughput of the core workflow engine during peak loads, as this performance is not influenced. Also, you can always increase memory for Elasticsearch later on if it is required.
:::

## Next steps

To validate these numbers for your specific workload, see [Running benchmarks](sizing-benchmarks.md).
