---
id: governance-process
title: How the governance process guides a project
sidebar_label: Governance process
description: "The ProcessOS Harness governance process runs on Camunda, tracks project state across phases and milestones, and drives the AI coding agent through governance jobs."
keywords: ["ProcessOS Harness", "governance process", "milestones"]
---

The governance process is the Camunda Solution Methodology implemented as an executable Camunda process. It holds the state of your ProcessOS Harness project, orchestrates SME feedback, and tells you what to do next.

Because the process runs on Camunda, your engagement is auditable by construction. Project state is tracked in Camunda, and every artifact is committed to Git.

## Start and attach to a governance run

Start a run with `/process-os-governance-start`. The skill configures the connection to your Camunda cluster, which can be local, SaaS, or Self-Managed, and then either attaches to an active process instance or creates one.

Use `/process-os-governance-start --reconnect` to attach again after a break, rather than starting a second instance for the same project.

The governance process needs a Camunda cluster that's reachable across your organization, because it coordinates SME feedback as well as your own work.

## Phases and milestones

The engagement runs through four phases in order, and each one is backed by a skill. The output of one phase is the input to the next.

| Phase     | Goal                                                                             | Milestone reached             |
| --------- | -------------------------------------------------------------------------------- | ----------------------------- |
| Scope     | Define the scope of the process to re-engineer.                                  | Process scope defined         |
| Discover  | Discover the as-is process from organizational memory, and close gaps with SMEs. | As-is model finalized         |
| Transform | Transform the as-is process into the agentic to-be process.                      | To-be models finalized        |
| Implement | Generate and implement the executable Camunda solution.                          | Solution ready for production |

Milestones matter more than the route between them. ProcessOS Harness gives you the flexibility to do whatever a project needs between two milestones, and the milestones keep the project moving in a direction everyone can verify.

## Work is done in governance jobs

Every step the governance process delegates is a service task backed by a job worker, and all of these tasks share the same shape.

| Field             | Purpose                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Skill name        | The ProcessOS Harness skill to run for this step.                                                                 |
| Skill mode        | The mode the skill runs in.                                                                                       |
| Skill input       | A FEEL context passed into the skill, for example `={discoveryQuestions: discoveryQuestions}`.                    |
| Run configuration | Run configuration keys merged into `run.config.yaml` before the skill runs, for example `={"max-iterations": 3}`. |

The job type isn't edited per task. It's derived from the project name, because the activation skill reconstructs the same value from `.camunda/governance.json`. A per-task change would make the task impossible to activate.

Apply the ProcessOS Harness Governance Job element template to a task, and the Modeler properties panel asks for these fields instead of raw Zeebe extension elements. Desktop Modeler finds the template automatically by walking up from the diagram directory. For Web Modeler, upload and publish the template to the project first.

## Drive jobs manually

You aren't limited to what the process hands you. The governance skills let you drive the run directly, which is useful when you're recovering from an error or want to repeat a step.

| Command                                             | What it does                                                                                                          |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/process-os-governance-job-activation [<jobType>]` | Activate one pending job, and output its key, instance key, and custom headers.                                       |
| `/process-os-governance-job-completion [<jobKey>]`  | Complete or fail the active job, forwarding any outbound variables. Use `--fail` and `--message` to report a failure. |
| `/process-os-governance-job-update <jobKey>`        | Extend a job's lock timeout. Use `--timeout 1` to release a stuck job.                                                |
| `/process-os-lifecycle-status`                      | Show the current lifecycle status of the project.                                                                     |

For the loop a single job goes through, see [how a builder task works](../other-features/builder-task.md).
