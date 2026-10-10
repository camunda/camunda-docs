---
id: build
title: Build a solution with ProcessOS Harness
sidebar_label: Build
description: "Understand the main concepts of a ProcessOS Harness: the governance process, builder tasks, review cycles, and the phases that take you from discovery to an executable Camunda solution."
keywords:
  ["ProcessOS Harness", "governance process", "builder task", "review cycle"]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

After you [install ProcessOS Harness](installation.md) and start the journey, you build your solution in a governed project. This section covers the main concepts of a ProcessOS project and how they work together.

## Main concepts

| Concept                                           | What it does                                                                                                                                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Governance process](build/governance-process.md) | Runs on Camunda, holds the state of your project, and guides you through phases and milestones. You ask the agent what's `next`.                                                                                                            |
| [Builder task](build/builder-task.md)             | The atomic unit of work. The agent activates a job, runs a skill, you act on the result, and the result is committed to Git.                                                                                                                |
| [Review cycle](build/review-cycle.md)             | Keeps a human in the loop. SMEs answer open questions and review generated artifacts until they sign off.                                                                                                                                   |
| Phases                                            | Scope, [discover](build/phases/1-discovery.md), [transform](build/phases/2-transformation.md), and [implement](build/phases/3-implementation.md). Each phase ends at a milestone, and the output of one phase is the input to the next one. |
