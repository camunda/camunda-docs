---
id: overview
title: ProcessOS Harness
sidebar_label: Overview
description: "ProcessOS discovers and re-engineers your existing processes to use AI, and generates executable Camunda solutions. ProcessOS Harness is the backbone of ProcessOS."
keywords:
  [
    "ProcessOS",
    "ProcessOS Harness",
    "Camunda Solution Harness",
    "re-engineering",
  ]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::caution Early access
ProcessOS Harness is available as [early access](/components/early-access/overview.md) for trained customers and enabled partners. See [current scope](#current-scope).
:::

## About

ProcessOS Harness is the backbone of ProcessOS. It is a governance process that runs on Camunda and drives AI coding agents in the terminal, such as Claude Code CLI or GitHub Copilot CLI, to perform the building safely and under control.

The input for ProcessOS Harness can be any resource that describes the process, such as files, systems, or web pages. The harness guides the agent through a phased approach, asks humans for review, and generates a tested and deployable Camunda solution.

## Who ProcessOS Harness is for

ProcessOS Harness targets the builder: someone who implements Camunda end to end and is comfortable directing AI coding agents. Subject matter experts (SMEs) take part as reviewers and approvers rather than as primary contributors, which reduces the time they invest in a project.

Builders get the most out of ProcessOS Harness when they bring:

- Technical depth in Camunda and software development.
- Practical experience with AI and agentic tools, including context management and prompt engineering.
- Enterprise production experience, and the judgment to tell a working demo from a working system.
- Stakeholder communication skills across engineering, architecture, and business leadership.
- Comfort with ambiguity.

## Key principles

### A governance process guides the journey

ProcessOS Harness runs your engagement as a governed process with defined phases and milestones. You keep full flexibility between milestones, but the milestones themselves ensure the project progresses.

| Phase     | Goal                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| Scope     | Define the scope of the process to re-engineer.                                 |
| Discover  | Discover the as-is process from organizational memory, and fill gaps with SMEs. |
| Transform | Transform the as-is process into an agentic to-be process.                      |
| Implement | Generate and implement the executable Camunda solution.                         |

Each phase ends at a milestone: process scope defined, as-is model finalized, to-be models finalized, and solution ready for production. Between milestones, [SME review cycles](build/review-cycle.md) act as gates that validate progress before the project moves on.

The governance process itself runs on Camunda. Project state lives in Camunda and every artifact is committed to Git, so the whole engagement is auditable. For details, see [how the governance process works](build/governance-process.md).

### Progress comes from iterations and your judgment

AI isn't deterministic, so ProcessOS Harness doesn't produce a finished solution in a single pass. Project maturity rises through iterations across discovery, transformation, and implementation, and thinking in iterations is the skill that matters most.

Your expert judgment is what turns agent output into a working system. ProcessOS Harness generates artifacts, such as process descriptions, BPMN models, DMN tables, Camunda Forms, and job workers, and runs tests, but you assess each result and confirm when it is ready to carry into the next phase. Plan for review, correction, and another iteration rather than for a single hand-off.

The AI coding agent supports you throughout. You can ask it to fix problems at any point, including working around defects you hit along the way.

### Two supported use cases

ProcessOS Harness runs all phases for both use cases, but uses different modes within them.

| Use case          | What it does                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Legacy migration  | Transforms processes running on a legacy system to Camunda 8, as a first step before AI transformation. |
| AI transformation | Transforms any process into an automated, AI-native process executable on Camunda 8.                    |

Legacy migration transformations can be optimized for specific source systems. Get in contact with Camunda to learn more.

## Current scope

Today, ProcessOS Harness focuses on taking you from discovery to a generated, tested Camunda solution. The following areas sit outside this release and are on the roadmap for future iterations:

- Production deployment and full application lifecycle management.
- Camunda platform setup and CI/CD integration.
- Custom application and user interface generation beyond Camunda Forms.
- Process performance measurement and quantitative analysis such as process mining.
- Shared organizational memory across projects.

In this release, each project runs locally with its own private memory. Cross-project memory and multi-project management are planned for future releases.

## Get started

1. [Set up your organization for ProcessOS Harness](setup/project-setup.md).
2. [Install ProcessOS Harness and configure a project](installation.md).
