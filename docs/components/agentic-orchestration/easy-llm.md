---
id: easy-llm
title: Get started with EasyLLM
sidebar_label: EasyLLM
description: "Get started with EasyLLM to run AI Agents quickly in Camunda SaaS."
keywords: [agentic orchestration, ai agent]
---

import EasyLLMSetup from './img/ao-easyllm-setup.png';

Get started with EasyLLM to run AI Agents quickly in Camunda SaaS without the need to set up your own LLM provider first.

## About

EasyLLM is a Camunda-managed LLM provider option that comes with automatically configured credentials, allowing you to start running AI agents in your processes right away without additional setup. It is free to use within the provided budget, and is intended for testing and experimentation. When you're ready for production or want more control, you can switch to a customer-managed provider.

EasyLLM is available in Camunda SaaS for:

- **SaaS trial organizations**: Includes Camunda-managed credentials and a smaller free budget so you can try AI agents quickly.
- **SaaS enterprise organizations**: Enterprise organizations can use EasyLLM with a larger budget to support multiple proofs of concepts. AI features must be explicitly enabled, and enabling AI features automatically enables EasyLLM. If EasyLLM is unavailable, disable and re-enable AI features.

:::note
Availability, budgets, and the exact UI labels may vary by environment and rollout stage.
:::

### How to set up EasyLLM for your agent

If EasyLLM is available in your organization, its credentials are populated automatically as cluster secrets.
Most Agent blueprints will default to use EasyLLM, so you can typically start running agents right away without additional configuration.

If you are building your own agent, use the agent's connector configuration to set the following parameters:

- Provider: `OpenaAI Compatible`
- API Endpoint: `{{secrets.CAMUNDA_PROVIDED_LLM_API_ENDPOINT}}`
- API Key: `{{secrets.CAMUNDA_PROVIDED_LLM_API_KEY}}`
- Model: Select a model from the list below, e.g. `us.anthropic.claude-3-7-sonnet-20250219-v1:0`

<p><img src={EasyLLMSetup} title="Setting up EasyLLM" alt="Setting up EasyLLM" className="img-"/></p>

### Available models

EasyLLM provides access to a selection of LLMs from multiple providers suitable for agentic orchestration. The exact models available may vary over time as we update the offering, but typically include popular general-purpose models from major providers.

#### Anthropic models

- `us.anthropic.claude-3-7-sonnet-20250219-v1:0`: A versatile model suitable for a wide range of agentic orchestration tasks, with strong reasoning and language capabilities.

### Trial vs. enterprise budgets

Organizational budgets are topped up automatically. The provided budgets differ depending on your SaaS plan:

- **Trial**: A smaller budget intended for quick evaluation and first experiments for individuals and small teams.
- **Enterprise**: A larger budget intended for broader team experimentation and proofs of concept.

Budgets are enforced at the organization level (not per user). This means multiple users in the same organization draw from the same budget.

### What does the budget cover

The EasyLLM budget covers calls made to the LLM provider during AI agent execution. The budget is measured in dollars spent.
A typical Trial budget might allow for a hundred to a few thousand Agent runs, depending on the models used and the complexity of the Agent itself. An Enterprise budget is significantly larger to support more extensive experimentation.

Other Camunda AI features (such as Camunda Copilot) does not consume your EasyLLM budget and can be used independently of EasyLLM.

:::note
An Agent run's total cost depends on the number of LLM calls it makes, which can vary based on the agent's design, the complexity of the task, and how many times it needs to call the LLM to complete its work. It also depends on the used model, as different models have different costs per token.
:::

### What happens when the budget is exhausted

When your organization reaches its EasyLLM budget cap:

- Additional LLM calls are **blocked**.
- Your process execution may fail with an “out of budget” style error (for example, a BPMN error such as `COST_LIMIT_EXCEEDED`, depending on the integration and how your process handles errors).

If your process model doesn’t handle LLM failures, exhausted budget may result in incidents or failed instances. Consider adding error handling in BPMN so you can provide a user-friendly fallback path.

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
