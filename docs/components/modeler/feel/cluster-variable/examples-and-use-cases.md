---
id: cluster-variable-examples
title: Common use cases
sidebar_label: "Use cases"
description: "Explore practical ways to use cluster variables with real-world examples."
---

Explore practical ways to use cluster variables with real-world examples, including environment-specific configurations, SLA rules, and integration endpoints.

## Environment-specific configuration

**Scenario**: You need different API endpoints and timeouts across development, staging, and production environments.

**Setup**:

GLOBAL (Production):

```json
{
  "PAYMENT_API": {
    "endpoint": "https://api.payment.prod.example.com",
    "timeout_ms": 5000,
    "retry_count": 3
  }
}
```

TENANT (dev-environment):

```json
{
  "PAYMENT_API": {
    "endpoint": "https://api.payment.dev.example.com",
    "timeout_ms": 30000,
    "retry_count": 1
  }
}
```

**Usage in BPMN**:
In a service task making a payment API call:

```
URL: = camunda.vars.env.PAYMENT_API.endpoint
Timeout: = camunda.vars.env.PAYMENT_API.timeout_ms
```

**Benefit**: The same BPMN file works across all environments without modification.

## Feature flags

**Scenario**: You want to gradually roll out a new approval workflow to specific tenants.

**Setup**:

GLOBAL:

```json
{
  "ENABLE_NEW_APPROVAL_FLOW": false
}
```

TENANT (tenant-a):

```json
{
  "ENABLE_NEW_APPROVAL_FLOW": true
}
```

TENANT (beta-customer-2):

```json
{
  "ENABLE_NEW_APPROVAL_FLOW": true
}
```

**Usage in BPMN**:
In an exclusive gateway condition:

```
Condition for new flow: camunda.vars.env.ENABLE_NEW_APPROVAL_FLOW = true
Condition for old flow: camunda.vars.env.ENABLE_NEW_APPROVAL_FLOW = false
```

**Benefit**: Control feature rollout per tenant without deploying different process versions.

## Multi-tenant SLA configuration

**Scenario**: Different tenants have different Service Level Agreements with varying approval thresholds and escalation
timeouts.

```json
{
  "SLA_CONFIG": {
    "approval_threshold": 1000,
    "escalation_hours": 24,
    "auto_approve_limit": 100
  },
  "auto_approve_limit": 100
}
```

```json
{
  "SLA_CONFIG": {
    "approval_threshold": 50000,
    "escalation_hours": 4,
    "auto_approve_limit": 5000
  },
  "auto_approve_limit": 5000
}
```

```json
{
  "SLA_CONFIG": {
    "approval_threshold": 5000,
    "escalation_hours": 48,
    "auto_approve_limit": 500
  },
  "auto_approve_limit": 500
}
```

**Usage in BPMN**:

Gateway condition for auto-approval:

```

amount <= camunda.vars.env.SLA_CONFIG.auto_approve_limit

```

Timer boundary event for escalation:

```

Duration: = duration("PT" + string(camunda.vars.env.SLA_CONFIG.escalation_hours) + "H")

```

**Benefit**: Customize business rules per tenant while maintaining a single process definition.

## Integration credentials and endpoints

**Scenario**: Your processes integrate with multiple external services that have different configurations per
environment.

```json
{
  "INTEGRATIONS": {
    "crm": {
      "base_url": "https://crm.prod.example.com",
      "api_version": "v2",
      "timeout_ms": 10000
    },
    "erp": {
      "base_url": "https://erp.prod.example.com",
      "api_version": "v1",
      "timeout_ms": 15000
    },
    "notification": {
      "base_url": "https://notify.prod.example.com",
      "api_version": "v1",
      "timeout_ms": 5000
    }
  }
}
```

TENANT (sandbox):

```json
{
  "INTEGRATIONS": {
    "crm": {
      "base_url": "https://crm.sandbox.example.com",
      "api_version": "v2",
      "timeout_ms": 30000
    }
  }
}
```

**Usage in BPMN**:

Service task for CRM integration:

```

URL: = camunda.vars.env.INTEGRATIONS.crm.base_url + "/" +
camunda.vars.env.INTEGRATIONS.crm.api_version + "/customers"

```

**Benefit**: Centralize integration configuration and easily switch between environments.
