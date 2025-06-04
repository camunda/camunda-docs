---
id: ao-design
title: Design and architecture
description: "Plan and design your agentic orchestration solutions, and understand recommended architecture and workflow guidelines."
keywords: ["agentic ai", "AI agents"]
---

import WorkflowImg from './img/ao-workflow.png';

Plan and design your agentic orchestration solutions, and understand recommended architecture guidelines.

## Plan

Use the following guidelines when planning your agentic orchestration solution:

- **Problem first**: First, identify any problem you might have in a process, and only then determine whether an AI agent could help solve the problem. Do not use an AI agent where it is not really necessary, or just for the sake of it.  

- **Architect for composability**. Avoid becoming too dependant on a specific LLM model, for example by doing too much fine tuning. This allows you to more easily integrate newer LLM providers and models that better suit your needs in the future.

- **Observability and governance**: Use [Operate](/components/operate/operate-introduction.md) and [Optimize](/components/optimize/what-is-optimize.md) for visibility of your agentic orchestration processes. 

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

Use the following guidelines when designing your agentic orchestration solution:

- **Guardrail sandwich**: Content, deterministic task → agent → deterministic validation.

- **Context packing vs. retrieval augmentation**: Content

- **Human-in-the-Loop escalation**: Content

- **Prompt versioning**: Version every prompt

### Mixing Agents with Workflow patterns

<p><img src={WorkflowImg} style={{marginBottom: '0'}} title="Diagram showing how to mix agents into your workflow patterns" className="img-transparent"/></p>

<table className="table-callout">
<tr>
    <td><span className="callout">1</span></td>
    <td>**Process Flow Within Tools**: Full BPMN control inside ad-hoc subprocesses for ultimate flexibility.</td>
</tr>
<tr>
    <td><span className="callout">2</span></td>
    <td>**Agents pivot instantly with external messages and timers**: During execution, agents can be influenced by events like external messages or timers, enabling on-the-fly adjustments.</td>
</tr>
<tr>
    <td><span className="callout">3</span></td>
    <td>**Event-Driven Agent Reconfiguration**: Sub-workflows handle new data, guiding the next AI steps.</td>
</tr>
<tr>
    <td><span className="callout">4</span></td>
    <td>**Agents orchestrate sub-workflow**: A tool doesn't need to be a single tool - it can be a whole subprocess.</td>
</tr>
<tr>
    <td><span className="callout">5</span></td>
    <td>**Multi-Agent Orchestration**: Agents orchestrate other agents for streamlined, scalable solutions.</td>
</tr>
</table>

## Implementation

Use the following guidelines when implementing your agentic orchestration solution:

- **Toolboxing beats monoliths**: Content

- **Temperature discipline**: Content

- **Latency budgets**: Content