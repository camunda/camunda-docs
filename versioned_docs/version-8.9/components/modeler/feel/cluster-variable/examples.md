---
id: cluster-variable-examples
title: Common use cases
sidebar_label: "Use cases"
description: "Explore practical ways to use cluster variables with real-world examples."
---

Explore practical ways to use cluster variables with real-world examples, including environment-specific configurations, SLA rules, and integration endpoints.

## Environment-specific configuration

You need different API endpoints and timeouts across development, staging, and production environments.

**Setup:**

Global scope, e.g., production:

```json
{
  "PAYMENT_API": {
    "endpoint": "https://api.payment.prod.example.com",
    "timeout_ms": 5000,
    "retry_count": 3
  }
}
```

Tenant scope, e.g., dev environment:

```json
{
  "PAYMENT_API": {
    "endpoint": "https://api.payment.dev.example.com",
    "timeout_ms": 30000,
    "retry_count": 1
  }
}
```

**Usage in BPMN:**

For example, in a service task making a payment API call:

```
URL: = camunda.vars.env.PAYMENT_API.endpoint
Timeout: = camunda.vars.env.PAYMENT_API.timeout_ms
```

**Benefit:** The same BPMN file works across all environments without modification.

## Feature flags

You want to gradually roll out a new approval workflow to specific tenants.

**Setup:**

Global scope, e.g., production:

```json
{
  "ENABLE_NEW_APPROVAL_FLOW": false
}
```

Tenant scope, e.g., `tenant-a`:

```json
{
  "ENABLE_NEW_APPROVAL_FLOW": true
}
```

Tenant scope, e.g., `beta-customer`:

```json
{
  "ENABLE_NEW_APPROVAL_FLOW": true
}
```

**Usage in BPMN:**

For example, in an exclusive gateway condition:

```
Condition for new flow: camunda.vars.env.ENABLE_NEW_APPROVAL_FLOW = true
Condition for old flow: camunda.vars.env.ENABLE_NEW_APPROVAL_FLOW = false
```

**Benefit:** Control feature rollout per tenant without deploying different process versions.

## Multi-tenant SLA configuration

Different tenants have different Service Level Agreements (SLAs) with varying approval thresholds and escalation timeouts.

**Setup:**

Tenant scope, e.g., `tenant-a`:

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

Tenant scope, e.g., `tenant-b`:

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

Tenant scope, e.g., `tenant-c`:

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

**Usage in BPMN:**

For example, in a gateway condition for auto-approval:

```
amount <= camunda.vars.env.SLA_CONFIG.auto_approve_limit
```

Timer boundary event for escalation:

```
Duration: = duration("PT" + string(camunda.vars.env.SLA_CONFIG.escalation_hours) + "H")
```

**Benefit:** Customize business rules per tenant while maintaining a single process definition.

## Integration credentials and endpoints

Your processes integrate with multiple external services that have different configurations per environment.

**Setup:**

Global scope, e.g., production:

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

Tenant scope, e.g., `sandbox`:

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

**Usage in BPMN:**

For example, a service task for CRM integration:

```
URL: = camunda.vars.env.INTEGRATIONS.crm.base_url + "/" +
camunda.vars.env.INTEGRATIONS.crm.api_version + "/customers"
```

**Benefit:** Centralize integration configuration and easily switch between environments.
