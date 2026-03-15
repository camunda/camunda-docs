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

:::info
Camunda-provided LLM is free to use within the provided budget, and is intended for testing and experimentation. When you're ready for production or need more control, switch to a customer-managed provider.
:::

Camunda-provided LLM is available in Camunda SaaS for:

- **SaaS trial organizations**: Includes Camunda-managed credentials and a free budget.
- **SaaS enterprise organizations**: Includes a larger budget to support multiple proofs of concept. You must explicitly enable AI features. When you enable them, Camunda-provided LLM is enabled automatically. If Camunda-provided LLM is unavailable, disable AI features and then re-enable them.

:::note
Availability, budgets, and UI may vary by environment and rollout stage.
:::

See [Trial vs. enterprise budgets](#trial-vs-enterprise-budgets) for more details.

## Set up Camunda-provided LLM

Once Camunda-provided LLM is available in your organization, its credentials are populated automatically as cluster secrets.

- If you are using an AI agent blueprint, no additional configuration is needed, since most AI agent blueprints default to use Camunda-provided LLM. Explore selected AI agent blueprints in the [Camunda Marketplace](https://marketplace.camunda.com/en-US/home).
- If you are building your own agent from scratch, enable Camunda-provided LLM by configuring your AI agent connector with the following parameters:
  - **Provider**: `OpenaAI Compatible`.
  - **API endpoint**: `{{secrets.CAMUNDA_PROVIDED_LLM_API_ENDPOINT}}`.
  - **API key**: `{{secrets.CAMUNDA_PROVIDED_LLM_API_KEY}}`.
  - **Model**: Select a model from the [list of supported models](#supported-models). For example `us.anthropic.claude-3-7-sonnet-20250219-v1:0`.

## Supported models

Camunda-provided LLM supports LLMs from multiple providers. The available models available may change over time, but typically include popular general-purpose models from major providers:

- **Anthropic models**: `us.anthropic.claude-3-7-sonnet-20250219-v1:0` is a versatile model suitable for a wide range of agentic orchestration tasks, with strong reasoning and language capabilities.
- **OpenAI models**: `gpt-5.2` is a powerful model with advanced reasoning, coding, and language skills, ideal for complex workflows requiring high accuracy.
- **Google models**: `gemini-3-pro` is a strong performer in reasoning and language tasks, making it a good choice for customer support and content generation workflows.

When selecting a model, consider your agentic process requirements, such as advanced reasoning, coding capabilities, or language understanding.
You can also benchmark different models to find the best fit. See [Choose the right LLM](./choose-right-model-agentic.md) for more details.

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
