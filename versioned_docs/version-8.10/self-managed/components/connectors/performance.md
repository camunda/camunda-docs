---
id: performance
title: Connector runtime performance
description: "Learn how to optimize connector performance in your self-managed environment."
---

This guide explains how to optimize the configuration of outbound connectors in your self-managed environment to achieve consistent and predictable performance.

## Overview

Connector runtime performance primarily depends on:

- The level of concurrency (`max in-flight` or `max-jobs-active`).
- The performance and rate limits of the external systems your connectors interact with.
- Whether the runtime uses polling or job streaming for job acquisition.

Before tuning the runtime, ensure you have proper observability in place and confirm where the bottleneck is.

## Measure outbound connector performance

The performance of a connector runtime is typically evaluated by two metrics:

- Jobs processed per second (throughput)
- Average processing time per activated job

The connector runtime exposes various metrics via `/actuator/prometheus`, including:

```
camunda_client_worker_job_total
camunda_connector_outbound_execution_time_seconds
executor_seconds_count{name="camundaClientExecutor"}
executor_seconds_max{name="camundaClientExecutor"}
```

Use Prometheus to scrape the metrics and visualize them. While no official Grafana dashboard is provided for connectors,
you can use the [connectors community Grafana dashboard](https://github.com/camunda-community-hub/connectors-grafana-dashboard) as a starting point.

## Identify the bottleneck

To better understand what adjustments you need, verify where the bottleneck is:

- Is your third-party system limiting throughput?
- Is CPU or memory saturated?
- Is the connector runtime operating in streaming or polling mode?

### Job streaming

:::note
Starting with connector runtime version 8.9.0+, job streaming is enabled by default.
:::

If your runtime operates in polling mode, you may observe the following side effects:

- The runtime does not pick up new jobs immediately and instead waits until the previous batch of jobs is fully processed, even though there are available threads.
- Job distribution is uneven between multiple replicas of the connector runtime, causing some replicas to be idle while others are overloaded.

To mitigate these issues, you can enable job streaming by setting the following property in your connector runtime configuration:

```
camunda.client.worker.defaults.stream-enabled=true
```

We recommend enabling job streaming unless you have specific reasons to use polling mode.  
To learn more, see [Job streaming in the gateway](/self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/job-streaming.md).

## Configure `max-in-flight`

The maximum concurrency (`max-in-flight`) defines how many jobs the connector runtime can work on in parallel.
The right configuration for `max-in-flight` depends on the executor type used by the connector runtime.

### Virtual threads executor (default)

Starting with connector runtime version 8.9.0+, the connector runtime uses virtual threads by default.

Virtual threads are lightweight threads that allow high concurrency with low resource consumption.
They are optimized for I/O-bound workloads such as connectors.

This feature builds on Project Loom, which is part of the standard Java Development Kit (JDK) starting with JDK 19. The current long-term support (LTS) release is JDK 21.

When you use virtual threads, the `max-in-flight` configuration defines the maximum number of virtual threads that can process jobs in parallel. The connector runtime can efficiently handle a large number of virtual threads, so you can often set a high `max-in-flight` value (for example, 500) without running into resource constraints.

To configure the `max-in-flight` for a connector runtime using virtual threads, set the following property:

```
camunda.client.worker.defaults.max-jobs-active=500
```

There is no practical upper limit for `max in-flight` when using virtual threads, but usually, the
performance bottleneck will be due to objective CPU limitations or external system rate limits.

We recommend gradually increasing the `max-in-flight` value while monitoring the performance and resource usage of your connector runtime until you reach an optimal configuration.

### Platform threads executor

You can disable virtual threads and use platform threads instead by setting the following property:

```
camunda.connector.virtual-threads.enabled=false
```

Connector runtime versions before 8.9.0 use platform threads by default.

When using platform threads, use the configuration options provided by the [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/configuration.md):

```
camunda.client.worker.defaults.max-jobs-active=20
camunda.client.execution-threads=20
```

The `max-jobs-active` property defines the maximum number of jobs that are activated in parallel.
The `execution-threads` property defines the size of the thread pool used to process jobs.
If you set `max-jobs-active` higher than `execution-threads`, the connector runtime queues jobs until a thread becomes available for processing.
If you set `execution-threads` higher than `max-jobs-active`, some threads remain idle while waiting for jobs to be activated.
