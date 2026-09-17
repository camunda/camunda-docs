---
id: builder-task
title: How a builder task works
sidebar_label: Builder task
description: "A builder task is the atomic unit of a ProcessOS Harness engagement: the agent activates a job, runs a skill, you act, the result is committed to Git, and the job completes."
keywords:
  ["ProcessOS Harness", "builder task", "auditability", "governance job"]
---

A builder task is a unit of work that is executed in the AI Coding Agent. Each task runs as a (Camunda) job, with a skill doing the main work and the builder overseeing, judging, and revising it. This shape gives every task three properties at once: guidance from the governance process for what to do, auditability through Camunda and Git, and full flexibility for the builder to do whatever else the job needs.

![alt text](../img/builder-task-in-modeler.png)

## The five steps

1. **Activate the job.** The agent pulls the next pending job from the governance process running on Camunda, along with its skill name, skill mode, and run configuration.
1. **Execute the skill.** The agent runs the ProcessOS Harness skill named in the job, producing or updating files in your project.
1. **Take your builder action.** You review what the skill produced, correct it, rerun it, or do whatever else the situation needs. This is the open part of the task.
1. **Commit to version control.** The result is committed to Git, which makes the change part of the permanent project record.
1. **Complete the job.** The agent pushes the outcome back to the governance process, which then decides the next step.

Steps 1 and 5 are handled by the agent against Camunda. You handle step 3.

## Drive the steps manually

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
