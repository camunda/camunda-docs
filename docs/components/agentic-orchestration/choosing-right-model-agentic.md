---
id: choosing-right-model-agentic
title: Best practices for your agentic process
description: Guide to selecting the appropriate LLM or foundation model for orchestrating agentic AI workflows.
---

Choosing the optimal Large Language Model (LLM) for your agentic workflow is crucial to ensure your AI agent can reliably carry out tasks in a Camunda process. The right model will effectively use tools, follow your instructions, and complete the required actions. This guide explains how to evaluate agent performance, defines key LiveBench benchmarking metrics, and provides an interactive tool to help you compare models and find the best fit for your use case.

## Measure agent performance with benchmarks

When integrating an AI agent into your process, evaluate how well it performs its intended actions. Key aspects of agent performance include how effectively it uses tools, whether it completes assigned tasks, and how strictly it follows instructions. For example:

- **Tool usage:** Measure whether the agent selects and uses the correct tools for the job. A good agent should choose appropriate tools with the right parameters to accomplish the user’s goals. Ineffective tool use can lead to unnecessary steps or failures, so this metric gauges the agent’s practical decision-making.

- **Action completion:** Determine if the agent successfully accomplishes all the user’s goals for a given task. This is the ultimate measure of success—did the agent fully resolve what it was asked to do? High performance here means the agent can carry a task through to the end without human intervention.

- **Instruction adherence:** Verify that the agent follows the instructions and guardrails you provide. The model should stay within its defined scope and honor any constraints (like not accessing disallowed data or sticking to a specific format). Strong instruction adherence indicates the agent’s behavior aligns with your guidelines and business rules.

To evaluate these aspects objectively, use standardized benchmarks. Standardized benchmarking provides a fair, apples-to-apples comparison between models by testing them on the same tasks under the same conditions. A benchmark like **LiveBench** avoids common pitfalls (for example, test data leakage or subjective human scoring) by using fresh tasks and ground-truth answers. Always remember that model selection depends heavily on your **use case**—the metrics that matter most will align with what you need the agent to do (for instance, a math-intensive workflow should prioritize a model’s math capabilities, while a customer support chatbot might emphasize language and instruction following). By benchmarking models on relevant metrics, you can choose an LLM that best meets your requirements.

## Understand LiveBench metrics and model strengths

LiveBench is a public leaderboard that evaluates many LLMs across multiple skill categories. Each **LiveBench metric** corresponds to a key capability of the model, giving you insight into its strengths and weaknesses. Below are the main metrics LiveBench tracks, along with what they mean and when they are important:

- **Reasoning:** Measures the model’s logical thinking and problem-solving ability. A high reasoning score indicates the model can perform complex reasoning tasks (for example, solving logic puzzles, making inferences, or planning in a process).  
  _Use case:_ Strategic decision-making, multi-step planning, or ambiguous scenarios where stepwise reasoning matters.

- **Math:** Tests the model’s skill with mathematics and numerical reasoning (for example, word problems, calculations, quantitative data).  
  _Use case:_ Finance, pricing, reporting, or any workflow requiring numerical accuracy.

- **Coding:** Evaluates programming and code-generation capabilities (writing code, debugging, implementing small features).  
  _Use case:_ Agents that write or analyze code, generate scripts, or fix bugs.

- **Data analysis:** Measures the ability to analyze and draw insights from data or content (tables, charts, documents, datasets).  
  _Use case:_ Log/file analysis, document Q&A, research synthesis, lightweight data science.

- **Instruction following:** Assesses how well the model follows given instructions and stays on task.  
  _Use case:_ Strict formats (JSON/CSV), compliance with policy, SOP-driven tasks.

- **Software engineering (agentic):** Evaluates the model’s capability to act as a software engineering agent, using tools and autonomy to solve coding tasks (for example, reading a GitHub issue and making code changes).  
  _Use case:_ Autonomous dev tasks—issue triage, code edits with tool assistance, CI/CD steps.

- **Language:** Reflects general language proficiency—context understanding, fluency, breadth of knowledge.  
  _Use case:_ Natural language interactions and content generation (emails, reports, chat).

Each metric highlights a different strength. By looking at LiveBench rankings, you may notice some models excel in certain categories but not others. For example, one model may be top-tier in reasoning but only average in coding, while another might have excellent coding ability but lower language fluency. Understanding these distinctions helps you pick a model whose strengths align with the tasks in your process.

## Model selection considerations

Choosing the right model often comes down to balancing practical trade-offs. Use the following decision framework to evaluate which model fits your scenario:

- **Hosting requirements (cloud vs. on-premises):** Do you need to run the model on your own infrastructure? For strict compliance or data control, favor open-source models you can self-host. Many proprietary models (for example, OpenAI or Anthropic) are cloud-only.

- **Data sensitivity and privacy:** If your use case involves PII or confidential data, prefer deployments where data stays under your control (on-prem or private cloud). If the data is non-sensitive, a cloud API may be acceptable. Ensure the deployment meets your compliance requirements.

- **Cost and speed priorities:** Identify whether **cost** or **latency** matters most. Larger, more capable models usually cost more and respond slower; smaller/open models can be cheaper and faster but may trade off accuracy. Balance these factors based on your budget, SLA, and complexity.

- **Accuracy vs. openness:** Peak accuracy often comes from proprietary leaders; openness offers portability, fine-tuning, and vendor freedom. If you need offline/edge deployment or customization, open models (for example, Llama-family, Falcon) are attractive. If the use case is mission-critical and intolerant to errors, top proprietary models may be worth the investment.

By weighing these factors, you can narrow down candidates that fit your constraints. Then, use benchmark data (like LiveBench scores) to compare those candidates head-to-head.

## Filter and compare models on LiveBench

Use the interactive tool below to generate a LiveBench link tailored to your needs. Adjust sliders and toggles to match your criteria—prioritize **speed** or **accuracy**, specify **open-source only**, or set a preference for **low cost**. As you change settings, a LiveBench link is generated that filters or sorts the leaderboard accordingly. Follow the link to view models that match your selection and compare their scores.

import LiveBenchModelFilter from '../react-components/livebench-model-filter.md'

<LiveBenchModelFilter/>
Benchmarks powered by **LiveBench** — *“LiveBench: A Challenging, Contamination-Free LLM Benchmark”* (White et al., ICLR 2025). Used under a Creative Commons license.

**Note:** Model rankings and metrics are provided by LiveBench. You do not need to host or download any model data. The generated link queries LiveBench directly so you always see the latest evaluation results.

Using LiveBench’s filtered rankings, you can quickly compare models on the metrics that matter. For example, if you toggle **on-premise** and **cost-sensitive**, you’ll likely see open-source models and how they rank on accuracy. If you prioritize **high accuracy** with less concern for cost, the link will surface top proprietary models.

In summary, choose your model based on the **use case**: measure what matters (tools, actions, instructions), check LiveBench scores for those areas, and consider practical factors like deployment and budget. With standardized benchmarks and a clear decision framework, you can confidently select the LLM or foundation model that will drive your Camunda agent to success.

## Sources

- https://openreview.net
- https://gist.github.com
- https://www.galileo.ai
