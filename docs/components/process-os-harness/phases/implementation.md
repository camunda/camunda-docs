---
id: implementation
title: Implement the Camunda solution
sidebar_label: Implementation
description: "The implementation phase generates execution-ready Camunda artifacts and job workers, then validates them with process tests, integration tests, and worker unit tests."
keywords:
  ["ProcessOS Harness", "implementation", "testing", "CPT", "job workers"]
---

Implementation turns a chosen to-be tier into a deployable Camunda solution. ProcessOS Harness generates execution-ready BPMN, DMN tables, Camunda Forms, and Java Spring Boot workers, then generates and runs the tests that show the solution behaves as intended.

This phase is where validation literacy matters most. The generated code compiles and the tests pass, but only you can judge whether the solution does the right thing, so treat the test layers below as evidence to read rather than a pass or fail signal.

## Generate the solution

```text
/process-os-artifact-generation
```

The skill builds one transformation tier into deployable artifacts in `artifacts/`. The tier is resolved in this order:

| Invocation                                       | Tier used                                                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `/process-os-artifact-generation --tier <tier>`  | The named tier, built from `transformation/bpmn/<tier>/`.                                                                   |
| `/process-os-artifact-generation`                | The `artifact-tier:` value in `transformation.config.md`. If unset, you're prompted to choose a tier that has BPMN on disk. |
| `/process-os-artifact-generation ... unattended` | Same resolution, skipping the proposal review gate.                                                                         |

The resolved tier is written back to `transformation.config.md`, so later runs reuse it without prompting.

## Set up a local environment

Validate against a real engine rather than reading generated code alone.

| Command                              | What it does                                                      |
| ------------------------------------ | ----------------------------------------------------------------- |
| `/process-os-environment-setup`      | Install and start Camunda 8 locally for development, using c8ctl. |
| `/process-os-test-environment-setup` | Set up the Camunda Process Testing (CPT) environment.             |
| `/process-os-process-instance-start` | Start a process instance with variables.                          |

## Deploy to a development cluster

```text
/process-os-deployment
```

Deployment orchestrates two building blocks you can also run on their own. `/process-os-deployment-resources` deploys BPMN, DMN, and forms to the engine, then smoke-tests them. `/process-os-deployment-code` boots the Java workers, cross-checks `@JobWorker` types against the job types in the BPMN, and confirms each one subscribes.

Both blocks triage a failure as either an inline fix or a generator defect, which tells you whether to correct the artifact or regenerate it. Run `/process-os-deployment --validate` to perform both checks without advancing the run.

:::warning
These commands target a development or test cluster. Deploying to production is outside the scope of ProcessOS Harness, and remains your own release process.
:::

## Validate with the test layers

ProcessOS Harness generates three layers of tests. They answer different questions, and none of them replaces the others.

| Layer             | What it validates                                                                                                   | Runtime               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Process tests     | BPMN orchestration: routing, sequencing, and error handling. All service tasks are mocked, and no real workers run. | Camunda engine        |
| Integration tests | Real job workers and connectors, with mocking as a last resort.                                                     | Camunda engine        |
| Worker unit tests | A worker's internal business logic and edge cases.                                                                  | Plain Java, no engine |

Process tests aim for complete BPMN element coverage, so every gateway branch, end event, and error boundary is exercised.

Integration tests come in three increasing scopes. A single-element test probes one task, connector, or DMN table with no mocking. A segment test runs from the start to a checkpoint, mocking user tasks only. An end-to-end test runs the full process with no mocking, for pre-release confidence.

Worker unit tests call the method annotated with `@JobWorker` directly as plain Java, using mocks. They need no Camunda runtime, no Docker, and no process context, which makes them the cheap way to cover logic edge cases.

### Generate and repair a test suite

| Command                              | What it does                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `/process-os-test-suite [path]`      | Generate, run, and repair a CPT suite, layered from happy path through negative, error, and edge cases. |
| `/process-os-test-evaluation [path]` | Explain the existing tests, and return a layered plan for the test suite to execute.                    |

Read the coverage plan before accepting a suite. A suite that passes while skipping an error boundary tells you less than a suite that fails on one.

## Lint the generated artifacts

| Command                                   | What it checks                                               |
| ----------------------------------------- | ------------------------------------------------------------ |
| `/process-os-bpmn-linting`                | Lints BPMN with bpmnlint, and applies targeted fixes.        |
| `/process-os-camunda-compatibility-check` | Validates BPMN against a specific Camunda 8 runtime version. |
| `/process-os-dmn-linting`                 | Lints DMN with dmnlint.                                      |
| `/process-os-forms-linting`               | Lints Camunda Forms against the form JSON schema.            |

## Next step

Review how to keep project data safe throughout the journey, described in [handle project data safely](../best-practices/data-handling.md).
