---
id: performance
title: Connector runtime performance
description: "Learn how to optimize connector performance in your self-managed environment."
---

This guide explains how to optimize the configuration of outbound connectors in your self-managed environment to achieve consistent and predictable performance.

## Overview

Connector runtime performance primarily depends on:

- The level of concurrency (`max-jobs-active`).
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

## Configure `max-jobs-active`

The maximum concurrency (`max-jobs-active`) defines how many jobs the connector runtime can work on in parallel.
The right configuration for `max-jobs-active` depends on the executor type used by the connector runtime.

### Virtual threads executor (default)

Starting with connector runtime version 8.9.0+, the connector runtime uses virtual threads by default.

Virtual threads are lightweight threads that allow high concurrency with low resource consumption.
They are optimized for I/O-bound workloads such as connectors.

This feature builds on Project Loom, which is part of the standard Java Development Kit (JDK) starting with JDK 19. The current long-term support (LTS) release is JDK 21.

When you use virtual threads, the `max-jobs-active` configuration defines the maximum number of virtual threads that can process jobs in parallel. The connector runtime can efficiently handle a large number of virtual threads, so you can often set a high `max-jobs-active` value (for example, 500) without running into resource constraints.

To configure the `max-jobs-active` for a connector runtime using virtual threads, set the following property:

```
camunda.client.worker.defaults.max-jobs-active=500
```

There is no practical upper limit for `max-jobs-active` when using virtual threads, but usually, the
performance bottleneck will be due to objective CPU limitations or external system rate limits.

We recommend gradually increasing the `max-jobs-active` value while monitoring the performance and resource usage of your connector runtime until you reach an optimal configuration.

:::caution Known issue with virtual threads on Java 24 and later
On Java 24 and later, a connector runtime that uses virtual threads can, in rare cases, stop processing jobs under load. The cause is a known upstream limitation: the JVM can still pin a virtual thread to its carrier thread while it loads or initializes a class (see [JEP 491](https://openjdk.org/jeps/491)), which can deadlock with the class loader of a Spring Boot fat jar (see [spring-boot#51463](https://github.com/spring-projects/spring-boot/issues/51463)).

Camunda is monitoring both issues. The connector runtime Docker images include changes that make this situation much less likely, but cannot rule it out completely.

If your connector runtime stops processing jobs, [disable virtual threads](#platform-threads-executor).
:::

### Platform threads executor

You can disable virtual threads and use platform threads instead by setting the following property:

```
camunda.connector.virtual-threads.enabled=false
```

Connector runtime versions before 8.9.0 use platform threads by default.

When using platform threads, use the configuration options provided by the [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/configuration.md):

```
camunda.client.worker.defaults.max-jobs-active=20
```

The `max-jobs-active` property defines the maximum number of jobs that are activated in parallel.
The connector runtime sizes its platform thread pool to the larger of `max-jobs-active` and `camunda.client.execution-threads`.

The `max-jobs-active` limit applies to each job worker, and the runtime opens one job worker per connector type, while all workers share the thread pool. If your processes run many connector types at the same time, more jobs can be active than there are threads, and jobs queue until a thread is free. In that case, set `camunda.client.execution-threads` higher than `max-jobs-active`.

:::note
This pool sizing applies to connector runtime 8.11, 8.10.6, 8.9.20, and later. In earlier versions, the thread pool is sized by `camunda.client.execution-threads` alone, which defaults to `1`. On those versions, set `execution-threads` to the same value as `max-jobs-active`, otherwise the runtime processes one job at a time.
:::
