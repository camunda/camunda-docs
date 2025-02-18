---
id: backpressure
title: "Backpressure"
description: "This document outlines an overview of backpressure and its accompanying assets."
keywords: [back-pressure, backpressure, back pressure]
---

When a broker receives a client request, it is written to the **event stream** first (see section [internal processing](/components/zeebe/technical-concepts/internal-processing.md) for details), and processed later by the stream processor.

If the processing is slow or if there are many client requests in the stream, it might take too long for the processor to start processing the command.
If the broker keeps accepting new requests from the client, the backlog increases and the processing latency can grow beyond an acceptable time.

To avoid such problems, Zeebe employs a backpressure mechanism. When the
broker receives more requests than it can process with an acceptable
latency, it rejects some requests (see [technical error handling](/apis-tools/zeebe-api/technical-error-handling.md)).

Alternatively, [flow
control write rate limits](/self-managed/operational-guides/configure-flow-control/configure-flow-control.md) can also
be used with static write rate limits or throttling. This prevents the
partition from building an excessive backlog of records not exported.

### Terminology

- **RTT** - Round-Trip Time, known as the time between when the request is accepted by the broker and when the response to the request is sent back to the gateway.
- **Inflight count** - The number of requests accepted by the broker but the response is not yet sent.
- **Limit** - Maximum number of flight requests. When the inflight count is above the limit, any new incoming request is rejected.

:::note
The limit and inflight count are calculated per partition.
:::

### Backpressure algorithms

Zeebe uses adaptive algorithms from [concurrency-limits](https://github.com/Netflix/concurrency-limits) to dynamically calculate the limit.
Configure Zeebe with one of the backpressure algorithms in the following sections.

The default values can be found in the [Zeebe Broker standalone configuration template](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.standalone.yaml.template) or in the [Zeebe Broker configuration template](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.yaml.template) in the `# backpressure` section.

#### Fixed limit

With **fixed limit**, one can configure a fixed value of the limit.
Zeebe operators are recommended to evaluate the latencies observed with different values for limit.
Note that with different cluster configurations, you may have to choose different limit values.

#### AIMD

**Additive increase/multiplicative decrease (AIMD)** calculates the limit based on the configured _requestTimeout_.
When the RTT for a request is shorter than _requestTimeout_, the limit is increased by 1.
When the RTT is longer than _requestTimeout_,
the limit will be reduced according to the configured _backoffRatio_.

#### Vegas

Vegas is an adaptive limit algorithm based on TCP Vegas congestion control algorithm.
Vegas estimates a base latency as the minimum observed latency.
This base RTT is the expected latency when there is no load.
Whenever the RTT deviates from the base RTT, a new limit is calculated based on the Vegas algorithm.
Vegas allows you to configure two parameters - _alpha_ and _beta_.
The values correspond to a queue size estimated by the Vegas algorithm based on the observed RTT, base RTT, and current limit.
When the queue size is below _alpha_, the limit is increased.
When the queue size is above _beta_, the limit is decreased.

#### Gradient

Gradient is an adaptive limit algorithm that dynamically calculates the limit based on observed RTT.
In the gradient algorithm, the limit is adjusted based on the gradient of observed RTT and an observed minimum RTT.
If gradient is less than 1, the limit is decreased. Otherwise, the limit is increased.

#### Gradient2

Gradient2 is similar to Gradient, but instead of using observed minimum RTT as the base, it uses an exponentially smoothed average RTT.

## Backpressure tuning

The goal of backpressure is to keep the processing latency low.
The processing latency is calculated as the time between the command is written to the event stream until it is processed.
To see how backpressure behaves, run a benchmark on your cluster and observe the following metrics:

- `zeebe_stream_processor_latency_bucket`
- `zeebe_dropped_request_count_total`
- `zeebe_received_request_count_total`
- `zeebe_backpressure_requests_limit`

You may want to run the benchmark with different loads:

1. With low load - Where the number of requests sent per second is low.
2. With high load - Where the number of requests sent per second is above what Zeebe can process within a reasonable latency.

If the value of the limit is small, the processing latency will be small, but the number of rejected requests may be high.
If the value of the limit is large, fewer requests may be rejected (depending on the request rate),
but the processing latency may increase.

When using **fixed limit**, you can run the benchmark with different values for the limit.
You can then determine a suitable value for a limit for which the processing latency (`zeebe_stream_processor_latency_bucket`) is within the desired latency.

When using **AIMD**, you can configure a `requestTimeout` which corresponds to a desired latency.
Note that during high load, AIMD can lead to a processing latency two times more than the configured `requestTimeout`.
It is also recommended to configure a `minLimit` to prevent the limit from aggressively dropping during constant high load.

When using **Vegas**, you cannot configure the backpressure to a desired latency.
Instead, Vegas tries to keep the RTT as low as possible based on the observed minimum RTT.

Similar to Vegas, you cannot configure the desired latency in Gradient and Gradient2.
They calculated the limit based on the gradient of observed RTT from the expected RTT.
The higher the value of _rttTolerance_, the higher deviations are tolerated that results in higher values for limit.

If a lot of requests are rejected due to backpressure, it might indicate that the processing capacity of the cluster is not enough to handle the expected throughput.
If this is the expected workload, you might consider a different configuration for the cluster, such as provisioning more resources and increasing the number of nodes and partitions.

## Potential issues

The rate limiter used by Zeebe to implement backpressure may use `System.nanoTime()` to measure the RTT of requests. In some systems, we've observed consecutive calls to this method can return equal or even decreasing values. [Low clock resolution](https://shipilev.net/blog/2014/nanotrusting-nanotime) and [monotonicity](https://bugs.openjdk.java.net/browse/JDK-6458294) [issues](https://stackoverflow.com/questions/3657289/linux-clock-gettimeclock-monotonic-strange-non-monotonic-behavior) are some of the most likely culprits of this. If this happens, it's recommended to configure the backpressure to use the **fixed** algorithm. Without a clock with sufficient resolution, adaptive backpressure algorithms are not useful.

import BackpressureWarning from '../../../components/react-components/backpressure-warning.md'

<BackpressureWarning/>

## Next steps

Looking for more information on backpressure? Review our documentation on [internal processing and backpressure](/components/zeebe/technical-concepts/internal-processing.md#handling-backpressure).
