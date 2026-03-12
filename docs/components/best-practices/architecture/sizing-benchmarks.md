---
id: sizing-benchmarks
title: Running benchmarks
tags:
  - Performance
  - Hardware
  - Sizing
  - Benchmarks
description: "How to run your own benchmarks to validate Camunda 8 sizing for your specific workload."
---

:::tip Audience
This page explains how to run your own benchmarks to validate sizing for your specific workload.
:::

The sizing recommendations in the [SaaS](sizing-saas.md) and [Self-Managed](sizing-self-managed.md) pages are based on a reference benchmark scenario. Your actual workload may differ significantly — different process models, payload sizes, task counts, or latency requirements. Running your own benchmarks is the most reliable way to validate that your chosen configuration meets your needs.

For background on the factors that influence sizing, see [Sizing overview](sizing-your-environment.md).

## Reference benchmark scenario

Camunda uses the following realistic benchmark scenario for all official sizing numbers:

- **Process model:** [bankCustomerComplaintDisputeHandling.bpmn](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) — a credit card fraud dispute handling process from the Camunda Marketplace blueprint, containing tasks, events, call activities, multi-instance, sub-processes, and DMN.
- **Payload:** [realisticPayload.json](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB).
- This produces approximately **101 tasks per second at 1 PI/s** due to internal sub-process instantiation (50 sub-process instances per root instance).

## Running your own benchmarks

Use the [Camunda 8 Benchmark project (c8b)](https://github.com/camunda-community-hub/camunda-8-benchmark) to run load tests against your cluster. c8b is a Spring Boot application that drives load against a Camunda 8 cluster.

### Key features

- Starts process instances at a configurable rate and **automatically adjusts based on backpressure**.
- Completes tasks that appear in the process instances.
- **Bring your own BPMN process model and payload** — can be URLs (e.g., GitHub Gists).
- **Automatic job type discovery** from BPMN files (no manual configuration needed).
- Configurable **task completion delay** to simulate real worker behavior.
- **Backpressure-aware rate adjustment** to find sustainable throughput automatically.
- Built-in **Prometheus metrics and Grafana dashboards** for observability.

### Quick start

```bash
# Run against your cluster with the default "typical" process
mvn spring-boot:run

# Or with Docker
docker run camundacommunityhub/camunda-8-benchmark:main

# Customize with your own process and payload
benchmark.bpmnResource=url:https://your-gist-url/your-process.bpmn
benchmark.payloadPath=url:https://your-gist-url/your-payload.json
benchmark.processInstanceStartRate=25
benchmark.taskCompletionDelay=200
```

:::caution Important
When running benchmarks, ensure you use a **properly sized environment**. A SaaS trial cluster has limited resources and will hit bottlenecks early. A developer machine running all components locally will not produce meaningful results. Use either a Camunda SaaS cluster of appropriate size (with Camunda representative help) or a properly provisioned Self-Managed Kubernetes environment.
:::

## When to benchmark

We recommend running your own benchmarks when:

- Your process models or payload sizes **differ significantly** from the reference scenario.
- **Latency or cycle time requirements** are critical to your use case.
- You are running **Optimize with payloads larger than the reference ~11 KB** or retention periods **exceeding 6 months**. Larger payloads and longer retention amplify Elasticsearch disk consumption and Optimize import times.
- You are **upgrading from a pre-8.8 version** and want to validate resource requirements.
- You are using **RDBMS (PostgreSQL) as secondary storage** and want to validate throughput differences.

## What to measure

When running benchmarks, focus on these key metrics:

- **Sustained throughput (tasks/second):** The rate your cluster can handle continuously without increasing backpressure.
- **Backpressure rate:** Should remain below 10% for sustainable operation.
- **Process instance latency (p99):** End-to-end time from instance creation to completion. Target depends on your SLO.
- **Elasticsearch disk growth rate:** Helps you forecast disk capacity needs.
- **Data availability latency:** Time between an event in the engine and its appearance in Operate/Tasklist.
- **CPU usage and throttling:** High CPU usage or frequent throttling indicates a need for more CPU resources or additional brokers.
- **Memory usage:** Sustained high memory usage suggests the need for larger memory limits or additional nodes.

<!-- TODO: Define the exact SLO boundary used for "max throughput" in the official benchmark tables (e.g., "max sustainable throughput where backpressure remains below 10% and p99 process duration stays under 1 second"). If the exact boundary is not standardized, document the methodology. -->

## Next steps

- For SaaS cluster size recommendations, see [SaaS cluster sizing](sizing-saas.md).
- For Self-Managed resource configurations, see [Self-Managed resource planning](sizing-self-managed.md).
- For factors that influence sizing, see [Sizing overview](sizing-your-environment.md).
