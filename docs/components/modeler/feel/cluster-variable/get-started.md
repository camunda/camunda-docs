---
id: cluster-variable-get-started
title: Get started with cluster variables
sidebar_label: "Get started"
description: "Get started with cluster variables."
---

This guide shows you how to create your first cluster variable and use it in a BPMN process.

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

Deploy your process and create an instance.
The cluster variable is automatically resolved during execution.

### Create your first tenant variable

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

### Common patterns

#### Environment configuration

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

Access nested values as follows:

```
camunda.vars.env.ENV_CONFIG.api_url
camunda.vars.env.ENV_CONFIG.timeout_ms
```

#### Feature flags

```json
{
  "key": "FEATURE_ENABLE_NEW_WORKFLOW",
  "value": true
}
```

Use it in conditional flows as follows:

```
camunda.vars.env.FEATURE_ENABLE_NEW_WORKFLOW = true
```

#### Thresholds and limits

```json
{
  "key": "APPROVAL_THRESHOLD",
  "value": 10000
}
```

Use it in gateway conditions as follows:

```
orderAmount > camunda.vars.env.APPROVAL_THRESHOLD
```
