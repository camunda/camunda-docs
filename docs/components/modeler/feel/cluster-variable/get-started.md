---
id: cluster-variable-get-started
title: Get started with cluster variables
sidebar_label: "Get started"
description: "Get started with cluster variables by creating your first one and using it in a BPMN process."
---

Get started with cluster variables by creating your first one and using it in a BPMN process.

Throughout this tutorial, you'll build a payment processing workflow that calls different payment API endpoints depending on the environment.

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

5. For the **Target** field, enter `apiUrl`. This creates a local variable for your service task.
6. Add another input mapping for the timeout using the following expression:

```
= camunda.vars.env.PAYMENT_API_CONFIG.timeout_ms
```

Set the target to `timeoutMs`.

Your service task now has access to both the `apiUrl` and `timeoutMs` variables, which automatically resolve to the correct values based on whether the process runs in your production cluster or the development tenant.

## Step 4: Deploy and test your process

1. Complete your BPMN diagram by adding any additional tasks and an end event.
2. Click **Deploy** to deploy your process to the cluster.
3. Create a process instance by clicking **Run** (or start it via API).
4. Navigate to Operate to view your process instance.
5. Inspect the process variables to see that the cluster variables were resolved correctly based on your tenant context.

**What happens during execution**

- If the process runs in the `dev-environment` tenant, it uses the development API endpoint (`https://api.payment.dev.example.com`) with a 30-second timeout.
- If the process runs in any other context, it uses the production API endpoint (`https://api.payment.prod.example.com`) with a five-second timeout.
- The BPMN file remains identical across all environments.

## Next steps

Congratulations! You've successfully created and used your first cluster variable in a BPMN process.

Now, [learn the fundamentals](./overview.md#learn-the-fundamentals) and [explore further resources](./overview.md#explore-further-resources).
