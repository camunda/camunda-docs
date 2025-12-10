---
id: cluster-variable-get-started
title: Get started with cluster variables
sidebar_label: "Get started"
description: "Get started with cluster variables by creating your first one and using it in a BPMN process."
---

Get started with cluster variables by creating your first one and using it in a BPMN process.

## Create a global cluster variable

Use the Camunda Orchestration Cluster API to create a global variable:

```bash
POST /v2/cluster-variables/global
Content-Type: application/json

{
  "key": "API_ENDPOINT",
  "value": "https://api.example.com"
}
```

### Create a tenant cluster variable

If you're using multi-tenancy, you can create tenant-specific overrides:

```bash
POST /v2/cluster-variables/tenant/{tenantId}
Content-Type: application/json

{
  "key": "API_ENDPOINT",
  "value": "https://api.tenant-specific.example.com"
}
```

:::note
Processes running in this tenant automatically use the tenant-specific value.
:::

## Access the variable in your BPMN process

In Camunda Modeler, you can access this variable using a FEEL expression:

```
camunda.vars.env.API_ENDPOINT
```

Use it in any expression field, such as:

- Service task input mappings.
- Gateway condition expressions.
- Script task variables.
- Output parameter expressions.

## Test your process

Deploy your process and start a new instance to validate the variable is read correctly in expressions and flow conditions.

:::info
The cluster variable is automatically resolved during execution.
:::

### Common usage patterns

#### Environment configuration

Store multiple related settings in one object and reference nested values in FEEL:

```json
{
  "key": "ENV_CONFIG",
  "value": {
    "api_url": "https://api.prod.example.com",
    "timeout_ms": 5000,
    "retry_count": 3
  }
}
```

Use in FEEL expressions:

```
camunda.vars.env.ENV_CONFIG.api_url
camunda.vars.env.ENV_CONFIG.timeout_ms
```

#### Feature flags

Use booleans to enable or disable behavior across processes:

```json
{
  "key": "FEATURE_ENABLE_NEW_WORKFLOW",
  "value": true
}
```

Use in conditional flows:

```
camunda.vars.env.FEATURE_ENABLE_NEW_WORKFLOW = true
```

#### Thresholds and limits

Centralize numeric thresholds used in decision logic:

```json
{
  "key": "APPROVAL_THRESHOLD",
  "value": 10000
}
```

Use in gateway conditions:

```
orderAmount > camunda.vars.env.APPROVAL_THRESHOLD
```
