---
id: builder-task
title: How a builder task works
sidebar_label: Builder task
description: "A builder task is the atomic unit of a ProcessOS Harness engagement: the agent activates a job, runs a skill, you act, the result is committed to Git, and the job completes."
keywords:
  ["ProcessOS Harness", "builder task", "auditability", "governance job"]
---

A builder task is the smallest unit of work in a ProcessOS Harness engagement. Every step the governance process delegates runs through the same five-step loop, which is what makes the engagement predictable even though the agent's output isn't.

## The loop

1. **Activate the job.** The agent pulls the next pending job from the governance process running on Camunda, along with its skill name, skill mode, and run configuration.
1. **Execute the skill.** The agent runs the ProcessOS Harness skill named in the job, producing or updating files in your project.
1. **Take your builder action.** You review what the skill produced, correct it, rerun it, or do whatever else the situation needs. This is the open part of the loop.
1. **Commit to version control.** The result is committed to Git, which makes the change part of the permanent project record.
1. **Complete the job.** The agent pushes the outcome back to the governance process, which then decides the next step.

Steps 1 and 5 are handled by the agent against Camunda. Step 3 is yours.

## Why the loop has this shape

The five steps exist to deliver three properties at once, which is difficult when the work itself is done by a non-deterministic agent.

| Property     | How the loop provides it                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Guidance     | The governance process holds the state, so it always knows which job comes next. You never have to reconstruct where a project stands. |
| Auditability | Every job is tracked in Camunda and every artifact is committed to Git, so each change has a decision and an author behind it.         |
| Flexibility  | Inside a job you can act freely, and you can call any skill directly at any time without waiting for the process to offer it.          |

Flexibility is the part that's easy to miss. The governance process suggests a route, but it doesn't restrict you to it. When a job's output isn't good enough, rerun the skill, edit the files by hand, or ask the agent to fix a specific problem before you complete the job.

## Drive the loop manually

The governance skills expose each step, which is useful when you're recovering from a failure or repeating work.

| Command                                             | Step                                                                               |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/process-os-governance-job-activation [<jobType>]` | Activate one pending job, and output its key, instance key, and custom headers.    |
| `/process-os-governance-job-completion [<jobKey>]`  | Complete or fail the active job. Use `--fail` and `--message` to report a failure. |
| `/process-os-governance-job-update <jobKey>`        | Extend a job's lock timeout. Use `--timeout 1` to release a stuck job.             |

A job whose lock expires while you're still working returns to the process as pending. If you expect a long builder action, extend the timeout rather than letting the job time out.

## Track progress across tasks

ProcessOS Harness tracks lifecycle progress per project in `.camunda/state.md`. Commit this file, so your team can see where the project stands without attaching to the governance run.

Run `/process-os-lifecycle-status` to show the current status at any time.
