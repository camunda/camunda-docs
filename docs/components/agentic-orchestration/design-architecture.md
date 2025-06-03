---
id: ao-design
title: Design and architecture
description: ""
keywords: ["agentic ai", "AI agents"]
---

Plan and design your agentic orchestration solutions, and understand recommended architecture guidelines.

## Plan

Problem → Agent, not Agent → Problem

Agents are spices, not the entrée

Architect for composability

Observability is non-negotiable

### When to use deterministic or non-deterministic orchestration

Agentic orchestration involves blending both deterministic and dynamic (AI-driven) process orchestration into your end-to-end processes. It is important to understand when to use each approach: 

| &nbsp; | Deterministic | Dynamic |
|-- |-- |-- |
| **Suitable for** | <p><ul><li><p>Clear, predictable paths.</p></li><li><p>Repeatable, rules-based decisions.</p></li><li><p>Fast, efficient execution.</p></li><li><p>Regulation dictates execution sequence.</p></li></ul></p> | <p><ul><li><p>Flexible, context-aware choices.</p></li><li><p>AI-driven task planning.</p></li><li><p>Unstructured cases: classification, triage, or investigation.</p></li><li><p>Adaptable to data and conditions.</p></li></ul></p> |
| **Enabled by** | <p><ul><li><p>Advanced workflow patterns.</p></li><li><p>Business/IT alignment on process and decision logic.</p></li></ul></p> | <p><ul><li><p>Dynamic task scheduling and tracking.</p></li><li><p>Collaboration between AI and Human.</p></li></ul></p> |


:::info
To learn more about determining when and where to use AI agents within your automation strategy, download the [why agentic process orchestration belongs in your automation](https://page.camunda.com/wp-why-agentic-process-orchestration-belongs-in-your-automation-strategy) strategy guide.
:::

## Design and architecture

observability

Guardrail Sandwich (deterministic task → agent → deterministic validation)

Context Packing vs. Retrieval Augmentation

Human-in-the-Loop Escalation Paths

Version every prompt

## Implementation

Toolboxing beats monoliths

Temperature discipline

Latency budgets