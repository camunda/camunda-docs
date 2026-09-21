---
id: implementation
title: Implement the Camunda solution
sidebar_label: Implementation
description: "The implementation phase generates execution-ready Camunda artifacts and job workers, then validates them with process tests, integration tests, and worker unit tests."
keywords:
  ["ProcessOS Harness", "implementation", "testing", "CPT", "job workers"]
---

Implementation turns a chosen to-be tier into a deployable Camunda solution. ProcessOS Harness first generates the execution-ready artifacts, including BPMN, DMN tables, Camunda Forms, and job workers, from the transformation output. It then deploys the solution to a development or test cluster so it can be exercised end-to-end. Finally, it generates and runs three layers of tests, so you can see the solution behaves as intended before it moves into your own release process.

:::warning
These commands target a development or test cluster. Deploying to production is outside the scope of ProcessOS Harness, and remains your own release process.
:::

## WIP - Validate with the test layers

ProcessOS Harness generates three layers of tests. They answer different questions, and none of them replaces the others.

| Layer             | What it validates                                                                                                   | Runtime               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Process tests     | BPMN orchestration: routing, sequencing, and error handling. All service tasks are mocked, and no real workers run. | Camunda engine        |
| Integration tests | Real job workers and connectors, with mocking as a last resort.                                                     | Camunda engine        |
| Worker unit tests | A worker's internal business logic and edge cases.                                                                  | Plain Java, no engine |

Process tests aim for complete BPMN element coverage, so every gateway branch, end event, and error boundary is exercised.

Integration tests come in three increasing scopes. A single-element test probes one task, connector, or DMN table with no mocking. A segment test runs from the start to a checkpoint, mocking user tasks only. An end-to-end test runs the full process with no mocking, for pre-release confidence.

Worker unit tests call the method annotated with `@JobWorker` directly as plain Java, using mocks. They need no Camunda runtime, no Docker, and no process context, which makes them the cheap way to cover logic edge cases.

## Next step

Review how to keep project data safe throughout the journey, described in [handle project data safely](../best-practices/data-handling.md).
