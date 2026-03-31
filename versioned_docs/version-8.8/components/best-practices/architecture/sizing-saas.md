---
id: sizing-saas
title: Size your SaaS cluster
tags:
  - Performance
  - Hardware
  - Sizing
  - SaaS
description: "Select the right Camunda 8 SaaS cluster size based on your needs."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Select the right Camunda 8 SaaS cluster size based on your needs. For an overview of the factors that influence sizing, see [Size your environment](./sizing-your-environment.md).

## Determine your cluster size

Camunda 8 defines four [cluster sizes](/components/concepts/clusters.md#cluster-size) (1x, 2x, 3x, and 4x) you can select after choosing your [cluster type](/components/concepts/clusters.md#cluster-type).

To do so, follow these steps:

1. Calculate your throughput and storage requirements using the guidance in [Size your environment](./sizing-your-environment.md).
2. Use the [sizing tables](#sizing-tables) to find the cluster size that meets your needs.

:::note
Contact your Customer Success Manager to increase the cluster size beyond 4x. This requires custom sizing and pricing.
:::

### Sizing tables

| Cluster size                                         |                              1x |                              2x |                              3x |                              4x |
| :--------------------------------------------------- | ------------------------------: | ------------------------------: | ------------------------------: | ------------------------------: |
| Max Throughput **Tasks/day** **\***                  |                             9 M |                            18 M |                            27 M |                            36 M |
| Max Throughput **Tasks/second** **\***               |                             100 |                             200 |                             300 |                             400 |
| Max Throughput **Process Instances/second** **\*\*** |                               5 |                              10 |                              15 |                              20 |
| Max Total Number of PI stored (in ES) **\*\*\***     |                           200 k |                           400 k |                           600 k |                           800 k |
| Approximate resources provisioned **\*\*\*\***       | 11 vCPU, 22 GB mem, 192 GB disk | 22 vCPU, 44 GB mem, 384 GB disk | 33 vCPU, 66 GB mem, 576 GB disk | 44 vCPU, 88 GB mem, 768 GB disk |

<!-- TODO: Validate "with Optimize" numbers against 8.9 benchmarks. The numbers above were measured with Camunda 8.8. Also confirm whether the "max throughput" boundary condition is defined as backpressure < 10% and p99 process duration < 1s, or another SLO. -->

:::note
The numbers in the tables were measured using Camunda 8 (version 8.8), [the benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark) running on its own Kubernetes cluster, and using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) with this [payload](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/reducedPayload.json) (~1.4 KB). To calculate day-based metrics, an equal distribution over 24 hours is assumed.
:::

**\*** Tasks (including service, send, and user tasks, among others) completed per day are the primary metric, as this is easy to measure and strongly influences resource consumption. This number assumes a constant load throughout the day. Tasks/day and Tasks/second are scaled linearly.

**\*\*** Because tasks are the primary resource driver, the number of process instances supported by a cluster is calculated assuming an average of 10 tasks per process. As a customers, you can calculate a more accurate process instance estimate using your anticipated number of tasks per process.

**\*\*\*** Maximum total number of historical process instances within the retention period.
For active process instances, this is limited mostly by Zeebe resources; for historical instances, it is limited mostly by Elasticsearch resources. Calculated assuming a typical set of process variables per process instance. Note that it makes a difference whether you add one or two strings (requiring ~1 KB of space) to your process instances or attach a full JSON document containing 1 MB, as this data must be stored in various places, influencing memory and disk requirements. If this number increases, you can still retain the runtime throughput, but Tasklist, Operate, and/or Optimize may lag behind.
The provisioned disk size is calculated as the sum of the disk size used by Zeebe and Elasticsearch.

**\*\*\*\*** These are the resource limits configured in the Kubernetes cluster and are subject to change.

## Data retention

The maximum throughput numbers should be considered peak loads, and the data retention configuration considered when defining the amount of data kept for completed instances in your cluster. See [Camunda 8 SaaS data retention](/components/saas/data-retention.md) for the default retention times for Zeebe, Tasklist, Operate, and Optimize.

- If process instances are completed and older than the configured retention time for an application, the data is removed.
- If a process instance is older than the configured retention time but still active and incomplete, it continues to function at runtime and is _not_ removed.

Camunda can adjust data retention on request (up to certain limits). Consider retention time adjustments and/or storage capacity increases if you plan to run more than \[max PI stored in ES\] / \[configured retention time\].

:::note Why is the total number of process instances stored that low?
This is related to the limited resources provided to Elasticsearch, which can cause performance problems when too much data is stored there. By increasing the available memory for Elasticsearch, you can also increase that number. At the same time, even with this rather low number, you can always guarantee the throughput of the core workflow engine during peak loads, as this performance is not affected. You can also increase memory for Elasticsearch later if needed.
:::

## Next steps

Validate your chosen configuration by [running your own benchmarks](sizing-benchmarks.md).
