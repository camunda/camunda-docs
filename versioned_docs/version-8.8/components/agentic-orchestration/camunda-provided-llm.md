---
id: camunda-provided-llm
title: Camunda-provided LLM
sidebar_label: Camunda-provided LLM
description: "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM."
keywords: [agentic orchestration, ai agent]
---

Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.

## About

Camunda-provided LLM is a Camunda-managed LLM provider option that comes with automatically configured credentials. With it, you can run AI agents in your processes right away without additional setup.

Camunda-provided LLM is only available in Camunda 8 SaaS. It is not available in Camunda 8 Self-Managed.

:::info
Camunda-provided LLM is free to use within the provided budget, and is intended for testing and experimentation. When you're ready for production or need more control, switch to a customer-managed provider.
:::

Key benefits:

- **No LLM account setup required.** You don't need to sign up with a model provider or configure credentials to start exploring AI agents.
- **Compare different LLM providers.** Run your agent with different models and easily switch between them to find the best fit for your use case.
- **No surprise bills.** Your organization gets a free, preconfigured budget for testing and experimentation.
- **Instant blueprints.** AI agent blueprints that use Camunda-provided LLM work out of the box with no configuration needed.
- **Seamless transition.** When you're ready for production, switch to a customer-managed provider like AWS Bedrock without changing your process architecture.

Camunda-provided LLM is available in Camunda SaaS for:

- **SaaS trial organizations**: Includes Camunda-managed credentials and a free budget. AI features are enabled by default.
- **SaaS enterprise organizations**: Includes a larger budget to support multiple proofs of concept. You must explicitly enable AI features in Camunda Console. When you enable them, Camunda-provided LLM is enabled automatically. If Camunda-provided LLM is unavailable, disable AI features and then re-enable them.

:::note
Availability, budgets, and UI may vary by environment and rollout stage.
:::

See [Trial vs. enterprise budgets](#trial-vs-enterprise-budgets) for more details.

## Set up Camunda-provided LLM

Once Camunda-provided LLM is available in your organization, its credentials are populated automatically as cluster secrets.

- If you are using an AI agent blueprint, no additional configuration is needed in most cases. Explore selected AI agent blueprints in the [Camunda Marketplace](https://marketplace.camunda.com/en-US/home).
- If you are building your own agent from scratch, enable Camunda-provided LLM by configuring your [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) with the following parameters:
  - **Provider**: `OpenAI Compatible`.
  - **API endpoint**: `{{secrets.CAMUNDA_PROVIDED_LLM_API_ENDPOINT}}`.
  - **API key**: `{{secrets.CAMUNDA_PROVIDED_LLM_API_KEY}}`.
  - **Model**: Select a model from the [list of supported models](#supported-models). For example `amazon.nova-pro-v1`.

## Supported models

Camunda-provided LLM uses a managed LLM gateway that supports multiple models from different providers. You can switch between models to compare how your agent performs with each one. When using the AI Agent connector, set the **Model** field to one of the following values:

| Model                       | Value to set in **Model**     | What it's good for                                                                                                                |
| :-------------------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| Amazon Nova Pro v1          | `amazon.nova-pro-v1`          | Best for balanced quality and cost across general-purpose AI agent scenarios.                                                     |
| Anthropic Claude Haiku 4.5  | `anthropic.claude-haiku-4-5`  | Best for lightweight assistants, short interactions, and lower-cost tasks that still need good instruction following.             |
| Anthropic Claude Opus 4.5   | `anthropic.claude-opus-4-5`   | Best for advanced analysis and challenging multi-step tasks where maximum quality is the priority.                                |
| Anthropic Claude Sonnet 4.6 | `anthropic.claude-sonnet-4-6` | Best as the default for complex agent tasks, balancing strong reasoning, reliable tool use, speed, and budget consumption.        |
| Anthropic Claude Sonnet 5   | `anthropic.claude-sonnet-5`   | Best for demanding agent tasks when you want stronger reasoning and tool use than the default and can trade off speed and budget. |
| DeepSeek v3.2               | `deepseek.v3.2`               | Best for technical and coding-heavy workflows that need strong reasoning at moderate cost.                                        |
| OpenAI GPT-OSS 120B         | `openai.gpt-oss-120b`         | Best for higher-quality results than small open models while still controlling cost.                                              |
| OpenAI GPT-OSS 20B          | `openai.gpt-oss-20b`          | Best for budget-conscious experimentation and simpler automations with lower complexity.                                          |
| Qwen Qwen3 235B             | `qwen.qwen3-235b`             | Best for advanced reasoning and coding use cases where you want strong performance with good cost efficiency.                     |

:::note
When selecting a model, consider your process requirements, expected usage volume, and token budget. For model selection guidelines, see how to [choose the right LLM](./choose-right-model-agentic.md).
:::

## Trial vs. enterprise budgets

The budgets, measured in **dollars (USD) spent**, differ depending on your SaaS plan:

- **Trial**: A smaller budget intended for quick evaluation and early experiments by individuals and small teams.
- **Enterprise**: A larger budget intended for broader team experimentation and proofs of concept.

:::important
Budgets are topped up automatically and enforced at the organization level (not per user). This means multiple users in the same organization draw from the same budget.
:::

### What the budget cover

The Camunda-provided LLM budget covers LLM provider calls during AI agent execution:

- **Trial budget**: Allows for a hundred to a few thousand agent runs, depending on the model used and the agent complexity.
- **Enterprise budget**: Is significantly larger to support more extensive experimentation.

Other Camunda AI features, such as Camunda Copilot, do not consume your Camunda-provided LLM budget and can be used independently.

:::note
The total cost of an agent run depends on how many LLM calls it makes, which can vary based on the agent’s design and task complexity. Cost also depends on the model used, since different models have different per-token pricing.
:::

### When budget is exhausted

When your organization reaches its Camunda-provided LLM budget cap:

- Additional LLM calls are **blocked**.
- Your process execution may fail with an “out of budget” error, such as `COST_LIMIT_EXCEEDED`, depending on how your process handles errors.

:::tip
If your process model doesn’t handle LLM failures, an exhausted budget may result in incidents or failed instances. Consider adding BPMN error handling to provide a user-friendly fallback path.
:::

## Monitor usage

The Camunda-provided LLM budget is shared across your organization, so you should monitor consumption. Camunda Console shows usage statistics for Camunda-provided LLM, including:

- How much of your budget has been used.
- How much budget remains.

Use this data to plan your transition to a customer-managed provider when you're ready for production.

## Switch away from Camunda-provided LLM

As you move from evaluation to production, you may want to switch to your own LLM provider. This gives you:

- Direct control over provider choice.
- Your own billing and quota management.
- The ability to scale beyond the Camunda-provided LLM budget caps.

:::important Before you begin

- Ensure your organization has access to the LLM provider you plan to use.
- Gather credentials and any required configuration.
- Identify where your current AI agent models rely on Camunda-provided LLM defaults.
  :::

To switch away, follow these steps:

1. Add your LLM provider credentials in the appropriate Camunda location for managing secrets and credentials.
2. Update your AI Agent connector configuration to use the new LLM provider.
3. Re-deploy your process.
4. Test a process instance end-to-end and verify results.

Your orchestration model doesn’t change during this transition. The BPMN process, event choreography, and human touchpoints you designed with Camunda-provided LLM carry forward unchanged, while only the LLM backend configuration shifts.
