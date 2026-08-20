---
title: Best Practices
description: "Condensed Camunda project experience covering process modeling, development, architecture, operations, and agentic orchestration, as a mix of conceptual and practical implementation guidance."
---

import DocCardList from '@theme/DocCardList';
import { useCurrentSidebarCategory } from '@docusaurus/theme-common';

export const section = (label) => useCurrentSidebarCategory().items.find((item) => item.label === label).items;

The Camunda Best Practices distill Camunda's experience with BPMN, DMN, and agentic orchestration on the Camunda toolstack, drawing on consulting engagements, community feedback, and customer projects. They offer a blend of conceptual and practical guidance, generalized from current project experience. They are not definitive: learning is ongoing, and how well a practice applies depends on your situation.

Note that Camunda extends the same guarantee to Best Practices as to the core product. However, Camunda cannot ensure the absolute accuracy or timeliness of the information provided, and disclaims any liability for damages resulting from applying these recommendations.

## Project management

<DocCardList items={section('Project management')}/>

## Architecture

<DocCardList items={section('Architecture')}/>

## Development

<DocCardList items={section('Development')}/>

## Modeling

<DocCardList items={section('Modeling')}/>

## Operations

<DocCardList items={section('Operations')}/>

## CI/CD guidelines

<DocCardList items={section('CI/CD guidelines')}/>

## Agentic orchestration

Processes that hand a step to an [AI agent](/reference/glossary.md#ai-agent) run on the same engine, variables, and audit trail as fully deterministic ones, so the practices above still apply. For specific guidance on designing, tuning, and evaluating agents, see the [agentic orchestration documentation](/components/agentic-orchestration/agentic-orchestration-overview.md):

- [Design and architecture](/components/agentic-orchestration/design-architecture.md) covers deciding where an agent belongs in a process, blending deterministic and AI-driven steps, and guardrail patterns such as human-in-the-loop escalation.
- [Model recommendations](/components/agentic-orchestration/model-recommendations-agentic.md) covers writing tool descriptions, managing the context window, sanitizing tool output, and prompting.
- [Choose the right model](/components/agentic-orchestration/choose-right-model-agentic.md) covers benchmarking candidate LLMs against your own requirements.
- [Evaluate AI agents](/components/agentic-orchestration/evaluate-agents/evaluate-agents-overview.md) covers testing non-deterministic flows, monitoring agents in Operate, analyzing token and tool usage in Optimize, and detecting agents that go off the rails.
