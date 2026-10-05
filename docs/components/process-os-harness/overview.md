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
import AgenticIcon from "@site/docs/components/assets/icon-agentic.png";
import ConfigIcon from "@site/docs/components/assets/icon-config.png";
import AoGrid from '../react-components/\_ao-card';

ProcessOS is an AI-powered intelligence layer on top of Camunda's agentic orchestration platform. It discovers existing processes from organizational knowledge, re-engineers them against defined outcomes, and generates executable Camunda solutions.

## About

ProcessOS Harness is the governance backbone of ProcessOS. It is a governance process that runs on Camunda and drives AI coding agents, such as Claude Code or GitHub Copilot CLI, to do the building safely and under control. The harness guides the agent through each phase, asks for human review at defined gates, and commits every artifact to Git, so an AI-generated solution stays reviewable at every step.

:::note Early access
The [early access](/components/early-access/overview.md) release of ProcessOS covers ProcessOS Harness only. It is available to trained customers and enabled partners, and behavior and commands can change between releases. To get access, contact your Camunda account team or a Camunda Forward Deployed Engineer.
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

Prepare your organization and run your first ProcessOS Harness project.

<AoGrid columns={2} ao={[
{
link: "../project-setup/",
title: "Set up your organization",
image: ConfigIcon,
description: "Prepare your organization for a first ProcessOS Harness project.",
},
{
link: "../system-requirements/",
title: "Check system requirements",
image: DocsIcon,
description: "Review the tools and access ProcessOS Harness needs.",
},
{
link: "../get-started/",
title: "Install and configure a project",
image: PlayIcon,
description: "Install ProcessOS Harness and configure your first project.",
},
]} />

## Learn the fundamentals

Understand how ProcessOS Harness guides a project from discovery to a generated solution.

<AoGrid columns={2} ao={[
{
link: "../get-started/governance-process/",
title: "Governance process",
image: BPMNIcon,
description: "See how phases, milestones, and gates guide a project.",
},
{
link: "../get-started/review-cycle/",
title: "Review cycles",
image: DocsIcon,
description: "Validate generated results with subject matter experts.",
},
{
link: "../get-started/builder-task/",
title: "Builder task",
image: AgenticIcon,
description: "Learn how a builder task works in Camunda.",
},
]} />

## Explore the phases and further resources

Follow the phases of a project, and read about additional features and recommendations.

<AoGrid columns={2} ao={[
{
link: "../phases/discovery/",
title: "Discovery",
image: PlayIcon,
description: "Discover the as-is process from organizational memory.",
},
{
link: "../phases/transformation/",
title: "Transformation",
image: PlayIcon,
description: "Transform the as-is process into an agentic to-be design.",
},
{
link: "../phases/implementation/",
title: "Implementation",
image: PlayIcon,
description: "Generate and implement the executable Camunda solution.",
},
{
link: "../other-features/artifact-generation/",
title: "Artifact generation",
image: BPMNIcon,
description: "Generate Camunda artifacts from your process models.",
},
{
link: "../best-practices/data-handling/",
title: "Data handling",
image: DocsIcon,
description: "Handle project data safely.",
},
]} />
