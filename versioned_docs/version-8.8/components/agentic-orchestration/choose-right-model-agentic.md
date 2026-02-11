---
id: choose-right-model-agentic
title: Choose the right LLM
sidebar_label: Choose the right LLM
description: How to select the right LLM or foundation model for orchestrating agentic AI workflows.
---

Choose the right Large Language Model (LLM) to ensure your AI agent reliably executes tasks in a Camunda process.

## About this guide

This guide covers:

- How to measure agent performance with standardized benchmarks
- Key LiveBench metrics and what they mean
- A decision framework for selecting models based on deployment and business needs
- How to use LiveBench’s interactive tool to compare models

## Measuring agent performance

The ideal model should handle tools effectively, follow instructions consistently, and complete actions successfully.

When evaluating models for your agentic process, focus on three core capabilities:

- **Tool usage:** How accurately does the model choose and use the right tools? Poor tool usage leads to failed tasks or wasted steps.
- **Action completion:** Does the agent fully achieve the goals of each task without manual intervention?
- **Instruction adherence:** Does the model follow your prompts, policies, and constraints as expected?

Standardized benchmarks help you measure these aspects objectively. They use the same tasks and conditions for every model, enabling fair comparisons.

:::note  
Model selection should always reflect your **use case**. A math-heavy workflow may weight numerical accuracy higher, while a customer support bot might prioritize language skills and instruction-following.  
:::

One such benchmark is **LiveBench**, which avoids common pitfalls such as test data contamination or subjective scoring by using fresh tasks and objective ground-truth answers.

## LiveBench metrics explained

LiveBench evaluates LLMs across multiple skill areas. Each metric represents a core capability:

| Metric                             | What it measures                                        | When it matters                                  |
| :--------------------------------- | :------------------------------------------------------ | :----------------------------------------------- |
| **Reasoning**                      | Logical thinking and stepwise problem-solving           | Strategic planning, multi-step workflows         |
| **Math**                           | Numerical accuracy and quantitative reasoning           | Finance, analytics, reporting                    |
| **Coding**                         | Code generation and debugging                           | Dev tools, automation scripts                    |
| **Data analysis**                  | Extracting insights from datasets, tables, or documents | Research, reporting, content analysis            |
| **Instruction following**          | Compliance with formats, rules, and prompts             | Policy-driven workflows, SOP tasks               |
| **Software engineering (agentic)** | Tool-assisted coding and autonomous dev work            | CI/CD, issue triage, automated PRs               |
| **Language**                       | Context understanding, fluency, general knowledge       | Chatbots, documentation, natural language output |

Different models excel in different areas. For instance, a model might rank highly in reasoning but score average on coding tasks. Matching model strengths to your workflow requirements ensures better outcomes.

## Model selection framework

Use this decision framework to narrow down your options before comparing benchmark scores:

| Consideration             | Description                                                                                                                             |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Hosting**               | Cloud-only vs. on-premises deployment. For compliance-heavy or air-gapped environments, self-hostable open-source models are preferred. |
| **Data sensitivity**      | Workflows handling PII or confidential data may require private deployments or self-hosting to meet data control requirements.          |
| **Cost vs. speed**        | Larger models offer higher accuracy but often with higher latency and cost. Balance performance against SLAs and budgets.               |
| **Accuracy vs. openness** | Proprietary models often lead in benchmark accuracy. Open-source models provide flexibility, fine-tuning, and offline use cases.        |

Once you filter by these constraints, benchmark scores like LiveBench’s help compare accuracy and capability across remaining candidates.

## Compare models with LiveBench

Use the interactive tool below to generate a LiveBench link based on your requirements. Adjust sliders for **speed**, **cost**, **accuracy**, or **open-source only** preferences. The tool outputs a link to a pre-filtered leaderboard reflecting your criteria.

import LiveBenchModelFilter from '../react-components/livebench-model-filter'

<LiveBenchModelFilter/>
<br/>

:::caution livebench tool

- Benchmarks are powered by **LiveBench** — _“LiveBench: A Challenging, Contamination-Free LLM Benchmark”_ (White et al., ICLR 2025). Used under a Creative Commons license.
- [LiveBench](https://livebench.ai/#/) rankings update continuously. The link always shows the most recent evaluation results.
- This tool is provided for illustration purposes only to help you choose the right LLM for your agentic processes.

:::

### Example

- **On-premises + cost-sensitive:** Likely shows open-source models ranked by accuracy.
- **High accuracy + less cost concern:** Surfaces top proprietary models.

## Key takeaway

Model choice should align with:

1. **Performance metrics** (tool usage, action completion, instruction adherence)
2. **LiveBench scores** for skills relevant to your workflow
3. **Practical constraints** like hosting, privacy, cost, and accuracy needs

A clear framework and benchmarked data helps you choose an LLM or foundation model to power your Camunda agent.

## Sources

- [OpenReview](https://openreview.net)
- [Galileo AI](https://www.galileo.ai)
- [Gist](https://gist.github.com)
