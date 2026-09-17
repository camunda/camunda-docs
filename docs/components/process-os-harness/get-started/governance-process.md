---
id: governance-process
title: How the governance process guides a project
sidebar_label: Governance process
description: "The ProcessOS Harness governance process runs on Camunda, tracks project state across phases and milestones, and drives the AI coding agent through governance jobs."
keywords: ["ProcessOS Harness", "governance process", "milestones"]
---

The governance process is the Camunda Solution Methodology implemented as an executable Camunda process. It holds the state of your ProcessOS Harness project, orchestrates SME feedback, and tells you what to do next.

Because the process runs on Camunda, your engagement is auditable by construction. Project state is tracked in Camunda, and every artifact is committed to Git.

## Phases and milestones

The engagement runs through four phases in order, and each one is backed by a skill. The output of one phase is the input to the next.

| Phase     | Goal                                                                             | Milestone reached             |
| --------- | -------------------------------------------------------------------------------- | ----------------------------- |
| Scope     | Define the scope of the process to re-engineer.                                  | Process scope defined         |
| Discover  | Discover the as-is process from organizational memory, and close gaps with SMEs. | As-is model finalized         |
| Transform | Transform the as-is process into the agentic to-be process.                      | To-be models finalized        |
| Implement | Generate and implement the executable Camunda solution.                          | Solution ready for production |

Milestones matter more than the route between them. ProcessOS Harness gives you the flexibility to do whatever a project needs between two milestones, and the milestones keep the project moving in a direction everyone can verify.

## How work is done

The governance process assigns each step of work to one of two task types, so a builder and their SMEs always know where to act.

| Task type    | Where you complete it                                     | Typical use                                                                                     |
| ------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Human task   | Camunda Tasklist, using a form.                           | Structured input from a person: process scope, SME answers to discovery gaps, review decisions. |
| Builder task | The AI coding agent, driven by a ProcessOS Harness skill. | Anything an agent can generate, transform, or check: discovery specialists, BPMN, forms, tests. |

Both task types share the same auditability. Human task outcomes land as process variables and form submissions in Camunda; builder task outcomes land as committed artifacts in Git and job completions in Camunda.

For the steps a single job goes through, see [how a builder task works](builder-task.md).

## Next steps

- Learn how [review cycles](review-cycle.md) bring SMEs into each phase.
- Understand [how a builder task works](builder-task.md).
- Start the first phase, described in [discover the as-is process](../phases/discovery.md).
