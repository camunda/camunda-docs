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

Each phase ends at a milestone: process scope defined, as-is model finalized, to-be models finalized, and solution ready for production. SME review gates sit on the path between them.

The governance process itself runs on Camunda. Project state lives in Camunda and every artifact is committed to Git, so the whole engagement is auditable. For details, see [how the governance process works](get-started/governance-process.md).

Improving a running solution and re-engineering it again are part of the wider lifecycle, but they're outside the scope of this release.

### Progress comes from iterations and your judgment

AI isn't deterministic, so ProcessOS Harness doesn't produce a finished solution in a single pass. Project maturity rises through iterations across discovery, transformation, and implementation, and thinking in iterations is the skill that matters most.

Your expert judgment is what turns agent output into a working system. ProcessOS Harness generates artifacts and runs tests, but you decide when a result is good enough to carry into the next phase. Plan for review, correction, and another iteration rather than for a single hand-off.

The AI coding agent supports you throughout. You can ask it to fix problems at any point, including working around defects you hit along the way.

### Two supported use cases

ProcessOS Harness runs all phases for both use cases, but uses different modes within them.

| Use case          | What it does                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Legacy migration  | Transforms processes running on a legacy system to Camunda 8, as a first step before AI transformation. There's no optimization for specific source systems. |
| AI transformation | Transforms any process into an automated, AI-native process executable on Camunda 8.                                                                         |

## What ProcessOS Harness doesn't do

ProcessOS Harness stops at a generated, tested solution. It doesn't:

- Deploy to production, or manage the full application lifecycle.
- Set up the Camunda platform, or implement CI/CD.
- Build applications or custom user interfaces. It generates Camunda Forms only.
- Measure process performance, or analyze quantitative data such as process mining.
- Build organizational memory across projects.

In this release, each project is isolated with private memory and is built on a local machine. There's no shared memory across projects and no multi-project management.

## Get started

1. Set up your organization for a first project, described in [set up your organization for ProcessOS Harness](project-setup.md).
2. Check the [system requirements](system-requirements.md).
3. Install ProcessOS Harness and configure your first project, described in [install ProcessOS Harness and configure a project](get-started.md).
