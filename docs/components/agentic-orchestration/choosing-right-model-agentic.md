---
id: choosing-right-model-agentic
title: Choose the right LLM
sidebar_label: Choose the right LLM
description: How to select the right LLM or foundation model for orchestrating agentic AI workflows.
---

Choose the right Large Language Model (LLM) to ensure your AI agent reliably executes tasks in a Camunda process.

This guide helps you evaluate and select the best LLMs based on your deployment requirements and business needs. It explains how to measure agent performance and shows how to leverage LiveBench’s standardized benchmarks to compare models effectively.

## Define your LLM needs

Consider the following aspects regarding your model requirements and setup constraints:

| Consideration             | Description                                                                                                                                                          |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hosting**               | Cloud-only vs. on-premises deployment. For compliance-heavy or air-gapped environments, self-hostable open-source models are preferred.                              |
| **Data sensitivity**      | Workflows handling Personally Identifiable Information (PII) or confidential data may require private deployments or self-hosting to meet data control requirements. |
| **Cost vs. speed**        | Larger models offer higher accuracy but often with higher latency and cost. Balance performance against Service Level Agreements (SLAs) and budgets.                 |
| **Accuracy vs. openness** | Proprietary models often lead in benchmark accuracy. Open-source models provide flexibility, fine-tuning, and offline use cases.                                     |

## Measure agent performance

The ideal model should handle tools effectively, follow instructions consistently, and complete actions successfully.

When evaluating models for your agentic process, focus on these three core capabilities:

- **Tool usage:** How accurately does the model choose and use the right tools? Poor tool usage leads to failed tasks or wasted steps.
- **Action completion:** Does the agent fully achieve the goals of each task without manual intervention?
- **Instruction adherence:** Does the model follow your prompts, policies, and constraints as expected?

## Benchmark your candidate models

Once you have defined your model needs, setup requirements, and peformance metrics, standardized benchmarks help you measure these aspects objectively.
They use the same tasks and conditions for every model, enabling fair comparisons.

### Learn about LiveBench metrics

One such benchmark is ​​[LiveBench](https://arxiv.org/abs/2406.19314), that evaluates LLMs across multiple skill areas.
It avoids common pitfalls such as test data contamination or subjective scoring by using fresh tasks and objective ground-truth answers.

Each LiveBench metric represents a core capability:

| Metric                             | What it measures                                         | When it matters                                   |
| :--------------------------------- | :------------------------------------------------------- | :------------------------------------------------ |
| **Reasoning**                      | Logical thinking and stepwise problem-solving.           | Strategic planning, multi-step workflows.         |
| **Math**                           | Numerical accuracy and quantitative reasoning.           | Finance, analytics, reporting.                    |
| **Coding**                         | Code generation and debugging.                           | Dev tools, automation scripts.                    |
| **Data analysis**                  | Extracting insights from datasets, tables, or documents. | Research, reporting, content analysis.            |
| **Instruction following**          | Compliance with formats, rules, and prompts.             | Policy-driven workflows, SOP tasks.               |
| **Software engineering (agentic)** | Tool-assisted coding and autonomous dev work.            | CI/CD, issue triage, automated PRs.               |
| **Language**                       | Context understanding, fluency, general knowledge.       | Chatbots, documentation, natural language output. |

Different models excel in different areas.
For instance, a model might rank highly in reasoning but score average on coding tasks.
Matching model strengths to your workflow requirements ensures better outcomes.

### Compare models with LiveBench

Use the interactive tool below to generate a LiveBench benchmark comparison.
It outputs a pre-filtered table based on your selected criteria.

import LiveBenchModelFilter from '../react-components/livebench-model-filter'

<LiveBenchModelFilter/>
<br/>

:::note

- LiveBench benchmarks are used under a Creative Commons license.
- [LiveBench rankings](https://livebench.ai/#/) update continuously. The table above shows the most recent evaluation results.
- This tool is provided for illustration purposes only to help you choose the right LLM for your agentic processes.
  :::

## Key takeaways

Your model choice should align with:

1. **Practical constraints** like hosting, privacy, cost, and accuracy needs.
1. **Performance metrics** such as tool usage, action completion, and instruction adherence.
1. **LiveBench scores** for skills relevant to your workflow.

:::important  
Model selection should always reflect your **use case**. For example, a math-heavy workflow may weight numerical accuracy higher, while a customer support bot might prioritize language skills and instruction-following.  
:::

A clear framework and benchmarked data helps you choose an LLM or foundation model to power your Camunda agent.
