---
id: governance-process
title: How the governance process guides a project
sidebar_label: Governance process
description: "The ProcessOS Harness governance process runs on Camunda, tracks project state across phases and milestones, and drives the AI coding agent through governance jobs."
keywords: ["ProcessOS Harness", "governance process", "milestones"]
---

The governance process is the Camunda Solution Methodology implemented as an executable Camunda process. It holds the state of your ProcessOS Harness project, orchestrates SME feedback, and tells you what to do `next`.

The governance process on the Camunda Cluster is started as part of `/process-os-governance-start'. From this point the process guides you thorugh all phases along certain milestones. Your input is required for gates, in jobs and tasks.

## Control the governance process with `next`

The governance process is controlled via the AI Coding Agent. As soon as you are done with a job, or you are unsure about the next thing to do, you ask the agent whats `next`. The AI Coding Agents interacts with Camunda and the governance process to provide the right guidance according to the current state of the project.

## Phases and milestones

The engagement runs through four phases in order. The output of one phase is the input to the next.

| Phase     | Goal                                                                        | Milestone reached             |
| --------- | --------------------------------------------------------------------------- | ----------------------------- |
| Scope     | Define the scope of the process to re-engineer.                             | Process scope defined         |
| Discover  | Discover the as-is process from provided sources, and close gaps with SMEs. | As-is model finalized         |
| Transform | Transform the as-is process into a to-be process.                           | To-be models finalized        |
| Implement | Generate and implement the executable Camunda solution.                     | Executable solution generated |

- Each phase starts with you defining the run configuration for the upcoming iteration
- The configuration can be adjusted after each run.
-

## Gates and tasks

The governance process needs human input to ensure the right outcomes.

| Type                            | Where you complete it                                                                               | Typical use                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Process Scope                   | Camunda Tasklist, using a form.                                                                     | The project and process scope are entered in the first phase.                                   |
| Phase configuration             | Camunda Tasklist, using a form.                                                                     | Each phase has configuration paramters.                                                         |
| [Review cycle](review-cycle.md) | Camunda Tasklist, using a form.                                                                     | Structured input from a person: SME answers to discovery gaps, review decisions.                |
| [Builder task](builder-task.md) | The AI coding agent, driven by a ProcessOS Harness skill.                                           | Anything an agent can generate, transform, or check: discovery specialists, BPMN, forms, tests. |
| Human gates                     | Skills define human gates. These are directly raised in the AI Coding Agent session inthe terminal. | Skill specific questions the agents needs input for.                                            |

## Next steps

- Learn how [review cycles](review-cycle.md) bring SMEs into each phase.
- Understand [how a builder task works](builder-task.md).
- Start the first phase, described in [discover the as-is process](../phases/1-discovery.md).
