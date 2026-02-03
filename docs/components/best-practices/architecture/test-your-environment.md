---
id: test-your-environment
title: Test your environment
description: "Test your Camunda 8 environment by validating your setup can sustain the expected workload over time and continues to meet performance expectations."
---

Test your Camunda 8 environment by validating your setup can sustain the expected workload over time and continues to meet performance expectations.

## About

Reliability testing validates:

- **Performance over time**, including detecting performance degradation.
- **Stability under sustained load**, including uncovering issues such as memory leaks.
- **Failure behavior and recovery**, ensuring failures are handled gracefully.
- **Environment-specific configuration and setup**, across SaaS and Self-Managed setups.

## How to test

Reliability testing focuses on two main practices:

- **Load testing** (including endurance/soak and stress testing).
- **Recovery testing** using **chaos experiments** (fault injection).

Load testing is used to understand how the system behaves under a defined workload and to detect issues that may not be visible in unit or integration tests.

Common load test types include:

- **Load tests**: Validate behavior under normal workload.
- **Stress tests**: Push the system toward its limits to find the maximum sustainable load.
- **Spike tests**: Validate behavior and recovery under short peak loads.
- **Endurance/soak tests**: Validate stability and performance under sustained load over longer periods.

## Setup

For comparability, load tests use the following setup:

- The **[Camunda Platform Helm chart](https://github.com/camunda/camunda-platform-helm)** to deploy Camunda 8.
- A dedicated **load test Helm chart** (**[camunda-load-tests](https://github.com/camunda/camunda-load-tests-helm)**) to deploy test applications.

A typical setup includes:

- A **three-node Camunda cluster**, configured with **three partitions** and a **replication factor of three**.
- A **three-node Elasticsearch cluster**, used to validate exporter throughput (exporting and archiving must keep up with the workflow engine load).
- Dedicated **starter** and **worker** load test applications (deployed by the load test Helm chart).

The deployment is run on a dedicated Kubernetes cluster (GKE in the internal reference setup). The same approach can be replicated in other Kubernetes environments.

## Test variants and indicative workloads

The load tests are executed with different process models and target workloads to cover different scenarios.

### Typical load (endurance/soak)

A “typical” straight-through process model is used (ten tasks, two timers, and one exclusive gateway) with a representative payload (~0.5 KB).

**Expected load:**

- **50 process instances per second (PI/s)** completed
- **500 task instances per second (TI/s)** completed

This is treated as an intrinsic target to sustain reliably.

### Realistic load (endurance/soak)

A more complex and realistic process model is used to cover a broader set of BPMN features (for example, call activities, multi-instance, sub-processes, and DMN).

**Expected load:**

- **50 process instances per second (PI/s)** completed
- **100 task instances per second (TI/s)** completed

Note that process structure can increase the effective work per started instance (for example, a single started instance can fan out into many sub-process instances).

### Max / stress load

A minimal process model is used (start event → one service task → end event) with a small payload (~0.5 KB). This is used to find upper bounds.

**Expected load:**

- **300 process instances per second (PI/s)** completed
- **300 task instances per second (TI/s)** completed

### Latency load tests

Latency-focused tests use a low, controlled throughput (for example, **1 PI/s**) to measure process completion latency with minimal contention.

## Observability and results

Observability is required to run and evaluate reliability tests. Load test applications and Camunda 8 components export metrics that are stored in Prometheus and visualized in Grafana dashboards.

- Metrics are stored in a self-hosted **Prometheus** instance.
- Dashboards are available in a self-hosted **Grafana** instance.
- A general dashboard is the **Zeebe Dashboard**:
  - https://github.com/camunda/camunda/blob/main/monitor/grafana/zeebe.json

The dashboards are used to:

- Monitor test execution and resource usage.
- Validate exporter throughput and backlog behavior.
- Detect performance degradation over time.
- Detect stability issues (for example, memory growth patterns).

> Note: The internal reliability testing documentation describes goals, setup, and workloads. It does not publish a single public “benchmark result table” because results vary by version, environment, and configuration. For external benchmarks, run tests against a representative target environment.

## Automated scenarios

Reliability tests are not only run ad-hoc. They are also executed regularly to detect regressions.

### Release load tests

For each supported/maintained version, a continuous load test is run and updated as part of the release process.

Goal:

- Validate release reliability and detect issues early (including during alpha updates).

Validation:

- Observe the dedicated “medic” dashboards during execution.

### Weekly load tests

Weekly tests run against the `main` branch with multiple endurance variants. These tests run for multiple weeks (with automatic cleanup), creating continuous coverage over time.

Goal:

- Detect newly introduced instabilities (for example, memory leaks) and performance degradation.

### Daily stress tests

Daily stress tests run against `main` with high artificial load.

Goal:

- Detect regressions quickly with a short feedback loop.
- Track performance trends over time.

### Ad-hoc load tests

Ad-hoc tests are supported for changes that require targeted validation.

Two common approaches are:

- Apply the `benchmark` label to a PR in the Camunda mono-repo (runs a predefined workflow).
- Trigger the **Camunda load test GitHub workflow** manually for more customization:
  - https://github.com/camunda/camunda/actions/workflows/camunda-load-test.yml

## Run your own tests

- Run load tests when sizing is near expected limits, when latency requirements are strict, or when workload patterns are unusual.
- Use production-like configuration for performance tests whenever possible.
- Include realistic payload sizes and process models, as these strongly affect throughput and resource usage.

For a starting point, see the [Camunda 8 benchmark project](https://github.com/camunda-community-hub/camunda-8-benchmark).
