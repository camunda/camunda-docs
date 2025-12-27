---
id: cluster-variable-get-started
title: Get started with cluster variables
sidebar_label: "Get started"
description: "Learn how to use cluster variables with a step-by-step tutorial for configuring API endpoints across environments."
---

This tutorial guides you through creating and using cluster variables in a BPMN process. You'll configure a payment API that uses different endpoints for production and development environments.

**Scenario**: You're building a payment processing workflow that needs to call different payment API endpoints depending on the environment.

## Step 1: Create a global cluster variable

First, create a global cluster variable that serves as your production API configuration. This variable is available to all processes across your cluster.

Use the Orchestration Cluster API to [create](../../../../apis-tools/orchestration-cluster-api-rest/specifications/create-global-cluster-variable.api.mdx) a global variable:

```bash
POST /v2/cluster-variables/global
Content-Type: application/json

{
  "key": "PAYMENT_API_CONFIG",
  "value": {
    "endpoint": "https://api.payment.prod.example.com",
    "timeout_ms": 5000,
    "retry_count": 3
  }
}
```

The API returns a confirmation response with your variable details.

## Step 2: Override for a specific tenant

Now, create a tenant-specific override for your development environment. This allows you to use the same BPMN process in both environments without modifications.

Replace `{tenantId}` with your actual tenant ID (for example, `dev-environment`):

```bash
POST /v2/cluster-variables/tenant/{tenantId}
Content-Type: application/json

{
  "key": "PAYMENT_API_CONFIG",
  "value": {
    "endpoint": "https://api.payment.dev.example.com",
    "timeout_ms": 30000,
    "retry_count": 1
  }
}
```

:::note
Processes running in the `dev-environment` tenant automatically use the development API configuration, while all other tenants use the production configuration.
:::

## Step 3: Access the variable in Modeler

Open Camunda Modeler and create or open a BPMN process. Add a service task to your process that calls the payment API.

To use your cluster variable in a service task:

1. Select the service task in your diagram.
2. In the properties panel, navigate to the **Input mappings** section.
3. Click **Add input mapping**.
4. For the **Source** field, enter the following FEEL expression to access the API endpoint:

   ```
   = camunda.vars.env.PAYMENT_API_CONFIG.endpoint
   ```

5. For the **Target** field, enter `apiUrl` (this creates a local variable for your service task).
6. Add another input mapping for the timeout using the expression:

   ```
   = camunda.vars.env.PAYMENT_API_CONFIG.timeout_ms
   ```

   Set the target to `timeoutMs`.

Your service task now has access to both the `apiUrl` and `timeoutMs` variables, which automatically resolve to the correct values based on whether the process runs in your production cluster or the development tenant.

## Step 4: Deploy and test your process

Complete your workflow and test it with the cluster variables:

1. Complete your BPMN diagram by adding any additional tasks and an end event.
2. Click **Deploy** to deploy your process to the cluster.
3. Create a process instance by clicking **Run** (or start it via API).
4. Navigate to Operate to view your process instance.
5. Inspect the process variables to see that the cluster variables were resolved correctly based on your tenant context.

**What happens during execution:**

- If the process runs in the `dev-environment` tenant, it uses the development API endpoint (`https://api.payment.dev.example.com`) with a 30-second timeout.
- If the process runs in any other context, it uses the production API endpoint (`https://api.payment.prod.example.com`) with a 5-second timeout.
- The BPMN file remains identical across all environments.

## Next steps

Congratulations! You've successfully created and used cluster variables in a BPMN process.

To learn more about cluster variables and explore additional patterns:

- **[Use cases and examples](examples.md)**: Explore more scenarios including feature flags, approval thresholds, and complex configurations.
- **[Usage guide](usage-guide.md)**: Learn about all the different ways to access cluster variables in BPMN elements.
- **[Scope and priority](scope-and-priority.md)**: Understand how global and tenant variables interact and override each other.
- **[Orchestration Cluster API reference](../../../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)**: Complete API documentation for managing cluster variables.
