---
id: overview
title: ProcessOS
sidebar_label: Overview
description: "ProcessOS discovers your existing processes, re-engineers them to use AI, and generates executable Camunda solutions. ProcessOS Harness, available as early access, is the governance process that drives AI coding agents to do this work."
keywords:
  [
    "ProcessOS",
    "ProcessOS Harness",
    "Camunda Solution Harness",
    "re-engineering",
  ]
---

import BPMNIcon from "@site/docs/components/assets/icon-bpmn.png";
import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import PlayIcon from "@site/docs/components/assets/icon-play.png";
import AoGrid from '../react-components/\_ao-card';

ProcessOS is an AI-powered intelligence layer on top of Camunda's agentic orchestration platform. It discovers existing processes from organizational knowledge, re-engineers them against defined outcomes, and generates executable Camunda solutions.

## About

ProcessOS Harness is the governance backbone of ProcessOS. It is a governance process that runs on Camunda and drives AI coding agents, such as Claude Code or GitHub Copilot CLI, to do the building safely and under control. The harness guides the agent through each phase, asks for human review at defined gates, and commits every artifact to Git, so an AI-generated solution stays reviewable at every step.

:::important Early access
ProcessOS Harness is available as [early access](/components/early-access/overview.md) to trained customers and enabled partners. For what this release covers, see [current scope](#current-scope).
:::

### Who ProcessOS Harness is for

ProcessOS Harness targets builders who implement end-to-end solutions with Camunda and are comfortable directing AI coding agents. Subject matter experts (SMEs) participate as reviewers and approvers rather than primary contributors, reducing the time they need to invest in a project.

Builders get the most out of ProcessOS Harness when they bring:

- Technical depth in Camunda and software development.
- Practical experience with AI and agentic tools, including context management and prompt engineering.
- Enterprise production experience, and the judgment to tell a working demo from a working system.
- Stakeholder communication skills across engineering, architecture, and business leadership.
- Comfort with ambiguity.

### Key principles

#### A governance process guides the journey

ProcessOS Harness runs your engagement as a governed process with defined phases and milestones. You keep full flexibility between milestones, but the milestones themselves ensure the project progresses.

| Phase     | Goal                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| Scope     | Define the scope of the process to re-engineer.                                 |
| Discover  | Discover the as-is process from organizational memory, and fill gaps with SMEs. |
| Transform | Transform the as-is process into an agentic to-be process.                      |
| Implement | Generate and implement the executable Camunda solution.                         |

Each phase ends at a milestone: process scope defined, as-is model finalized, to-be models finalized, and solution ready for production. Between milestones, [SME review cycles](run-a-project/review-cycle.md) act as gates that validate progress before the project moves on.

The governance process itself runs on Camunda. Project state lives in Camunda and every artifact is committed to Git, so the whole engagement is auditable. For details, see [how the governance process works](run-a-project/governance-process.md).

#### Progress comes from iterations and your judgment

AI isn't deterministic, so ProcessOS Harness doesn't produce a finished solution in a single pass. Project maturity rises through iterations across discovery, transformation, and implementation, and thinking in iterations is the skill that matters most.

Your expert judgment is what turns agent output into a working system. ProcessOS Harness generates artifacts and runs tests, but you assess each result and confirm when it is ready to carry into the next phase. Plan for review, correction, and another iteration rather than for a single hand-off.

The AI coding agent supports you throughout. You can ask it to fix problems at any point, including working around defects you hit along the way.

#### Two supported use cases

ProcessOS Harness runs all phases for both use cases, but uses different modes within them.

| Use case          | What it does                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Legacy migration  | Transforms processes running on a legacy system to Camunda 8, as a first step before AI transformation. |
| AI transformation | Transforms any process into an automated, AI-native process executable on Camunda 8.                    |

Legacy migration transformations can be optimized for specific source systems. Get in contact with Camunda to learn more.

### Current scope

Today, ProcessOS Harness focuses on taking you from discovery to a generated, tested Camunda solution. The following areas sit outside this release and are on the roadmap for future iterations:

- Production deployment and full application lifecycle management.
- Camunda platform setup and CI/CD integration.
- Custom application and user interface generation beyond Camunda Forms.
- Process performance measurement and quantitative analysis such as process mining.
- Shared organizational memory across projects.

In this release, each project runs locally with its own private memory. Cross-project memory and multi-project management are planned for future releases.

## Get started

Prepare for, install, and configure your first ProcessOS Harness project.

1. Check the [system requirements](get-started/system-requirements.md) for the Camunda cluster, version control system, AI coding agent, and local tooling you need.
2. Set up your organization for a first project, described in [set up your organization for ProcessOS Harness](get-started/project-setup.md).
3. Install ProcessOS Harness and configure your first project, described in [install ProcessOS Harness and configure a project](get-started/install.md).

## Run a project

Work through a project, guided by the governance process from discovery to a generated solution.

<AoGrid columns={2} ao={[
{
link: "../run-a-project/governance-process/",
title: "Governance process",
image: BPMNIcon,
description: "See how phases, milestones, and gates guide a project.",
},
]} />

### Phases

Follow the guidance for each phase of a project.

<AoGrid columns={2} ao={[
{
link: "../run-a-project/phases/discovery/",
title: "Discovery",
image: PlayIcon,
description: "Discover the as-is process from organizational memory.",
},
{
link: "../run-a-project/phases/transformation/",
title: "Transformation",
image: PlayIcon,
description: "Transform the as-is process into an agentic to-be design.",
},
{
link: "../run-a-project/phases/implementation/",
title: "Implementation",
image: PlayIcon,
description: "Generate and implement the executable Camunda solution.",
},
]} />

### Review

Validate the results of each phase with subject matter experts.

<AoGrid columns={2} ao={[
{
link: "../run-a-project/review-cycle/",
title: "Review cycles",
image: DocsIcon,
description: "Validate generated results with subject matter experts.",
},
]} />

## Best practices

Follow recommendations for working with ProcessOS Harness.

<AoGrid columns={2} ao={[
{
link: "../best-practices/data-handling/",
title: "Data handling",
image: DocsIcon,
description: "Handle project data safely.",
},
]} />
