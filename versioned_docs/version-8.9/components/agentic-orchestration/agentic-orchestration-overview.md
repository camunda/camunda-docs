---
id: agentic-orchestration-overview
title: Get started with agentic orchestration
sidebar_label: Get started with agentic orchestration
description: "Agentic orchestration combines deterministic BPMN process logic with LLM-driven flexibility, so AI agents, people, and systems collaborate in one governed, end-to-end process."
keywords: ["agentic orchestration", "AI agents", "BPMN", "governance"]
---

import PageDescription from '@site/src/components/PageDescription';
import AoGetStartedBanner from '../react-components/\_ao-get-started-banner';
import OverviewDiagramImg from './img/ao-overview-diagram.svg';

<PageDescription />

## About agentic orchestration

Agentic orchestration is a hybrid orchestration model that combines the power of deterministic logic with LLM-driven flexibility.

An [AI agent](/reference/glossary.md#ai-agent) evaluates the prompt, decides which tools to execute, and decides when the goal is achieved, while Camunda orchestrates the process around it with governance and auditability.

Use agentic orchestration to run the non-deterministic parts of a process, where the path to the outcome can't be fully defined in advance, on the proven foundation of BPMN.

<OverviewDiagramImg role="img" aria-label="Diagram showing agentic orchestration between agentic engagement channels, such as chatbots, messaging, and email, and core systems and data, such as databases, ERP, CRM, and LLMs. Events flow up and calls flow down. Orchestration provides visual process logic, LLM-based reasoning, and durable execution for processes, AI agents, decisions, IDP, and RPA bots." style={{maxWidth: '100%', height: 'auto', marginTop: '32px'}} />

## How it works

In an agentic process, decision-making and execution are intentionally split:

- **AI agents decide**: Which tool to call next, in what order, and when the goal is met.
- **Camunda orchestrates**: Executes the selected BPMN activities, stores variables, applies retries and incident handling, and routes human tasks and events.

Agents work alongside the other participants in your end-to-end process:

- **Deterministic logic**, such as gateways, rules, and service tasks, handles the steps that must always run the same way.
- **People** review, approve, or take over through human tasks, so there is a human in the loop where you need one.
- **Systems** are reached through connectors, APIs, and [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers, which the agent can use as tools.

## Why use agentic orchestration

- **Reliability**: Camunda enforces process boundaries, and retries and incident handling apply to every tool an agent calls.
- **Governance**: You control which tools an agent can use and how its results are validated, with guardrails between an agent's decision and what it actually does.
- **Auditability**: Agent activity is recorded as part of the process instance, so you can inspect and monitor what an agent did and why.
- **Flexibility**: Build anything from a simple task agent to a complex multi-agent system, and combine them with deterministic steps in one model.

## Next steps

- Learn [what AI agents are](/components/agentic-orchestration/ai-agents.md) and how the agent loop works.
- [Build your first AI agent](/guides/getting-started-agentic-orchestration.md).
- Review the [AI usage guidelines](/components/agentic-orchestration/ai-usage-guidelines.md) for requirements on security, legality, data handling, and human oversight.

<AoGetStartedBanner />
