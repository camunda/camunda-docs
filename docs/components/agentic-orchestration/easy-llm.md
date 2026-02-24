---
id: easy-llm
title: Get started with EasyLLM
sidebar_label: EasyLLM
description: "Get started with EasyLLM to run AI Agents quickly in Camunda SaaS."
keywords: [agentic orchestration, ai agent]
---

Get started with EasyLLM to run AI Agents quickly in Camunda SaaS.

## About

With EasyLLM in Camunda SaaS, you can use Camunda agentic orchestration features without the need to set up first your own LLM provider credentials.

EasyLLM is designed to help you reach a first working AI agent quickly while keeping costs predictable with **per-organization budgets** and pre-defined cost behavior.

### Availability

EasyLLM is available in Camunda SaaS for:

- **SaaS trial organizations**: Includes Camunda-managed credentials and a small free budget so you can try AI agents quickly.
- **SaaS enterprise organizations**: Can enable AI features to use Camunda-managed credentials with a larger budget (opt-in).

:::note
Availability, budgets, and the exact UI labels may vary by environment and rollout stage.
:::

## How budgets work

EasyLLM usage is controlled with **per-organization budget caps**. Budgets exist to:

- Keep usage predictable.
- Allow experimentation without needing to manage provider billing up front.
- Prevent runaway spend for a single organization.

### Trial vs. enterprise budgets

Budgets differ depending on your SaaS plan:

- **Trial**: A smaller budget intended for quick evaluation and first experiments.
- **Enterprise**: A larger budget intended for broader team experimentation and proofs of concept.

Budgets are enforced at the organization level (not per user). This means multiple users in the same organization draw from the same budget.

### What happens when the budget is exhausted

When your organization reaches its EasyLLM budget cap:

- Additional LLM calls are **blocked**.
- Your process execution may fail with an “out of budget” style error (for example, a BPMN error such as `COST_LIMIT_EXCEEDED`, depending on the integration and how your process handles errors).
- You should see an error message indicating what happened and what to do next (for example, switch to a customer-managed provider, request a top-up, or retry after the budget is adjusted).

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
3. **Re-deploy your process or blueprint**.
4. **Test a process instance** end-to-end and verify results in Operate/Tasklist/Optimize as applicable.

### What to check after switching

- The AI Agent connector is pointing to the intended provider and model.
- Your process error handling covers provider-side failures (timeouts, throttling, invalid credentials).
- Budget-related failures no longer occur because calls are now billed and limited by your provider (not EasyLLM).
