---
id: camunda-provided-llm
title: Camunda-provided LLM
sidebar_label: Camunda-provided LLM
description: "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM."
keywords: [agentic orchestration, ai agent]
---

import EasyLLMSetup from './img/ao-easyllm-setup.png';

Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.

## About

With Camunda-provided LLM, you can run AI agents in your processes right away without additional setup. It is a Camunda-managed LLM provider option that comes with automatically configured credentials.

:::info
Camunda-provided LLM is free to use within the provided budget, and is intended for testing and experimentation. When you're ready for production or need more control, switch to a customer-managed provider.
:::

Camunda-provided LLM is available in Camunda SaaS for:

- **SaaS trial organizations**: Includes Camunda-managed credentials and a free budget, so you can try AI agents quickly.
- **SaaS enterprise organizations**: Includes a larger budget to support multiple proofs of concept. You must explicitly enable AI features. When you enable them, Camunda-provided LLM is enabled automatically. If Camunda-provided LLM is unavailable, disable AI features and then re-enable them.

:::note
Availability, budgets, and the exact UI labels may vary by environment and rollout stage.
:::

## Set up Camunda-provided LLM

If Camunda-provided LLM is available in your organization, its credentials are populated automatically as cluster secrets.
Most AI agent blueprints default to use Camunda-provided LLM, so you can typically start running agents right away without additional configuration.

If you are building your own agent, use the agent's connector configuration to set the following parameters:

- **Provider**: `OpenaAI Compatible`.
- **API endpoint**: `{{secrets.CAMUNDA_PROVIDED_LLM_API_ENDPOINT}}`.
- **API key**: `{{secrets.CAMUNDA_PROVIDED_LLM_API_KEY}}`.
- **Model**: Select a model from the list, for example, `us.anthropic.claude-3-7-sonnet-20250219-v1:0`. See [AAvailable models](#available-models) for more details.

<div style={{ display: "flex", justifyContent: "center" }}>
  <img
    src={EasyLLMSetup}
    title="Set up Camunda-provided LLM"
    alt="Set up Camunda-provided LLM"
    className="img-noborder img-transparent"
    style={{ width: "auto", maxWidth: "50%", height: "auto" }}
  />
</div>

## Available models

Camunda-provided LLM provides access to a set of LLMs from multiple providers. The available models available may change over time, but typically include popular general-purpose models from major providers:

- **Anthropic models**: `us.anthropic.claude-3-7-sonnet-20250219-v1:0` is a versatile model suitable for a wide range of agentic orchestration tasks, with strong reasoning and language capabilities.

## Trial vs. enterprise budgets

Organizational budgets are topped up automatically. The provided budgets differ depending on your SaaS plan:

- **Trial**: A smaller budget intended for quick evaluation and early experiments by individuals and small teams.
- **Enterprise**: A larger budget intended for broader team experimentation and proofs of concept.

:::note
Budgets are enforced at the organization level (not per user). This means multiple users in the same organization draw from the same budget.
:::

### What the budget cover

The Camunda-provided LLM budget covers calls made to the LLM provider during AI agent execution. The budget is measured in **dollars (USD) spent**:

- A Trial budget might allow for a hundred to a few thousand agent runs, depending on the model used and the agent complexity.
- An Enterprise budget is significantly larger to support more extensive experimentation.

Other Camunda AI features, such as Camunda Copilot, do not consume your Camunda-provided LLM budget and can be used independently.

:::note
The total cost of an agent run depends on how many LLM calls it makes, which can vary based on the agent’s design and task complexity. Cost also depends on the model used, since different models have different per-token pricing.
:::

### When budget is exhausted

When your organization reaches its Camunda-provided LLM budget cap:

- Additional LLM calls are **blocked**.
- Your process execution may fail with an “out of budget” error. For example, a BPMN error such as `COST_LIMIT_EXCEEDED`, depending on the integration and how your process handles errors.

If your process model doesn’t handle LLM failures, an exhausted budget may result in incidents or failed instances. Consider adding BPMN error handling to provide a user-friendly fallback path.

## Use AI blueprints out of the box

You can use selected AI blueprints with minimal or no setup when your organization is configured to use EasyLLM.

Typical workflow:

1. In **Web Modeler**, create a new project.
2. Select **Browse blueprints**.
3. Choose an AI blueprint that is compatible with EasyLLM.
4. Deploy and run the blueprint to validate end-to-end behavior.

## Switch from EasyLLM to a customer-managed LLM

As you move from evaluation to production, you may want to bring your own LLM provider credentials. Switching away from EasyLLM typically gives you:

- Direct control over provider choice (for example, AWS Bedrock or another supported provider).
- Your own billing and quota management.
- The ability to scale beyond the EasyLLM budget caps.

### Before you begin

- Ensure your organization has access to the provider you plan to use.
- Gather credentials and any required configuration (for example, keys, region, model IDs, or authorization settings).
- Identify where your current AI agent models (connectors/blueprints) rely on EasyLLM defaults.

### Switch steps

1. **Add your provider credentials** (or provider configuration) in the appropriate Camunda location for managing secrets/credentials.
2. **Update your AI Agent connector configuration** to use the customer-managed provider instead of EasyLLM.
3. **Re-deploy your process**.
4. **Test a process instance** end-to-end and verify results in Operate/Tasklist/Optimize as applicable.

### What to check after switching

- The AI Agent connector is pointing to the intended provider and model.
- Your process error handling covers provider-side failures (timeouts, throttling, invalid credentials).
- Budget-related failures no longer occur because calls are now billed and limited by your provider (not EasyLLM).
