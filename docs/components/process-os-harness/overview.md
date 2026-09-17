---
id: overview
title: ProcessOS Harness
sidebar_label: Overview
description: "ProcessOS Harness discovers your existing processes, re-engineers them to use AI, and generates executable Camunda solutions, with a governance process keeping the work auditable."
keywords: ["ProcessOS Harness", "Camunda Solution Harness", "re-engineering"]
---

ProcessOS Harness is an AI-powered intelligence layer on top of Camunda's agentic orchestration platform. It discovers existing processes from organizational knowledge, re-engineers them against defined outcomes, and generates executable Camunda solutions.

The harness is the governance backbone of that work. It drives AI coding agents to do the building safely and under control, so an AI-generated solution stays reviewable at every step.

:::note Early access
ProcessOS Harness is available as [early access](/components/early-access/overview.md) for trained customers and enabled partners. Expect behavior and commands to change between releases.
:::

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

Each phase ends at a milestone: process scope defined, as-is model finalized, to-be models finalized, and solution ready for production. Between milestones, [SME review cycles](get-started/review-cycle.md) act as gates that validate progress before the project moves on.

The governance process itself runs on Camunda. Project state lives in Camunda and every artifact is committed to Git, so the whole engagement is auditable. For details, see [how the governance process works](get-started/governance-process.md).

### Progress comes from iterations and your judgment

AI isn't deterministic, so ProcessOS Harness doesn't produce a finished solution in a single pass. Project maturity rises through iterations across discovery, transformation, and implementation, and thinking in iterations is the skill that matters most.

Your expert judgment is what turns agent output into a working system. ProcessOS Harness generates artifacts and runs tests, but you assess each result and confirm when it is ready to carry into the next phase. Plan for review, correction, and another iteration rather than for a single hand-off.

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

1. Set up your organization for a first project, described in [set up your organization for ProcessOS Harness](project-setup.md).
2. Check the [system requirements](system-requirements.md).
3. Install ProcessOS Harness and configure your first project, described in [install ProcessOS Harness and configure a project](get-started.md).
