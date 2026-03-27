---
id: sizing-benchmarks
title: Run benchmarks
tags:
  - Performance
  - Hardware
  - Sizing
  - Benchmarks
description: "Run your own benchmarks to validate Camunda 8 sizing for your specific workload."
---

Run your own benchmarks to validate [Camunda 8 sizing](./sizing-your-environment.md) for your specific workload.

## Reference benchmark scenario

The sizing recommendations for [SaaS](sizing-saas.md) and [Self-Managed](sizing-self-managed.md) are based on a reference benchmark scenario. Your actual workload may differ significantly, so running your own benchmarks is the most reliable way to validate that your chosen configuration meets your needs.

Camunda uses the following realistic benchmark scenario:

- **Process model:** [bankCustomerComplaintDisputeHandling.bpmn](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) (a credit card fraud dispute handling process from the [Camunda Marketplace blueprint](https://marketplace.camunda.com/en-US/apps/449510/credit-card-fraud-dispute-handling)).
- **Payload:** [realisticPayload.json](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB).
- This setup produces approximately **101 tasks per second at 1 PI/s** due to internal sub-process instantiation (50 sub-process instances per root instance).

:::note
The official sizing numbers on this page are produced using the [load-tester](https://github.com/camunda/camunda/tree/main/load-tests/load-tester) tool from the Camunda monorepo.
:::

## Run your own benchmarks

Use the [Camunda 8 Benchmark project (c8b)](https://github.com/camunda-community-hub/camunda-8-benchmark), a Spring Boot application, to run load tests against your cluster.

### Key features

- Starts process instances at a configurable rate and **automatically adjusts based on backpressure**.
- Completes tasks that appear in the process instances.
- **Bring your own BPMN process model and payload**, which can be provided as URLs, such as GitHub Gists.
- **Automatic job type discovery** from BPMN files.
- Configurable **task completion delay** to simulate real worker behavior.
- Built-in **Prometheus metrics and Grafana dashboards** for observability.

### Quick start

Run the following command against your cluster:

```bash
mvn spring-boot:run
```

With Docker:

```bash
docker run camundacommunityhub/camunda-8-benchmark:main
```

Customize it with your own process and payload:

```bash
benchmark.bpmnResource=url:https://your-gist-url/your-process.bpmn
benchmark.payloadPath=url:https://your-gist-url/your-payload.json
benchmark.processInstanceStartRate=25
benchmark.taskCompletionDelay=200
```

:::important
To run meaningful benchmarks, use a **properly sized environment**. SaaS trial clusters and local developer machines have limited resources and will hit bottlenecks too early. Use either a correctly sized Camunda SaaS cluster (with help from your Camunda representative) or a properly provisioned Self-Managed Kubernetes environment.
:::

## When to benchmark

Running your own benchmarks when:

- Your process models or payload sizes **differ significantly** from the reference scenario.
- **Latency or cycle time requirements** are critical to your use case.
- You are running Optimize with **payloads larger than the reference ~11 KB** or retention periods **exceeding 6 months**. Larger payloads and longer retention amplify Elasticsearch disk consumption and Optimize import times.
- You are **upgrading from a pre-8.8 version** and want to validate resource requirements.
- You are using **RDBMS (PostgreSQL) as secondary storage** and want to validate throughput differences.

## What to measure

When running benchmarks, focus on these key metrics:

- **Sustained throughput (tasks/second):** The rate your cluster can handle continuously without increasing backpressure.
- **Backpressure rate:** Should remain below 10% for sustainable operation.
- **Process instance latency (p99):** End-to-end time from instance creation to completion. Target depends on your SLO.
- **Elasticsearch disk growth rate:** Helps you forecast disk capacity needs.
- **Data availability latency:** The time between an event in the engine and its appearance in Operate/Tasklist.
  - Note: to measure this, you have to compare the time from starting an instance and its availability in query APIs using the Orchestration Cluster REST API
- **CPU usage and throttling:** High CPU usage or frequent throttling indicates a need for more CPU resources or additional brokers.
- **Memory usage:** Sustained high memory usage suggests the need for larger memory limits or additional nodes.

<!-- TODO: Define the exact SLO boundary used for "max throughput" in the official benchmark tables (e.g., "max sustainable throughput where backpressure remains below 10% and p99 process duration stays under 1 second"). If the exact boundary is not standardized, document the methodology. -->
