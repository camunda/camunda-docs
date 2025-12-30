---
id: cluster-variable-scope-priority
title: Scope resolution
sidebar_label: "Scope resolution"
description: "Learn how cluster variable scope resolution works, the available scopes, and how to access and use them. Learn how cluster variable scope resolution works, t..."
---

Learn how cluster variable scope resolution works, the available scopes, and how to access and use them.

## About

Cluster variables use a scope priority process to determine which value is used when the same key exists at multiple levels.

This guide helps you understand this scope resolution to predict values in your processes and avoid unexpected behavior.

## Scope levels

Cluster variables exist at the **global** and **tenant** scope levels.

### Global scope

Variables defined at the global scope are available across the entire cluster and accessible by all processes, regardless of tenant context.

:::info
Global-scope cluster variables are ideal for cluster-wide defaults and shared configuration.
:::

They have lowest priority in variable resolution and are managed via the global cluster variables API.

### Tenant scope

Variables defined at the tenant scope are specific to a particular tenant and only accessible within that tenant's context.

:::note
Tenant-scope cluster variables are ideal for tenant-specific customization and overrides.
:::

They have higher priority than global-scope ones in variable resolution and are managed via the tenant-specific cluster variables API.

:::important
They are available only when multi-tenancy is enabled.
:::

## Resolution priority

From highest to lowest priority, the cluster variable resolution order is:

1. Process variables.
2. Tenant-scope cluster variables.
3. Global-scope cluster variables.

### Process variables

Variables defined on the process instance always take precedence over cluster variables. This includes:

- Variables set during instantiation.
- Variables created or updated during execution.
- Variables passed from parent to child processes.

:::note
If you create a process variable with a key that matches a cluster variable path (for example, `camunda.vars.env.API_URL`), the process variable will shadow the cluster variable completely.
:::

### Tenant-scope cluster variables

When multi-tenancy is enabled, tenant-scoped variables:

- Override global scope variables with the same key.
- Are visible only to processes in that tenant.
- Enable tenant-specific customization without affecting other tenants.

### Global-scope cluster variables

Global cluster variables provide cluster-wide defaults and baseline configuration. These variables:

- Are accessible to all processes across all tenants.
- Serve as fallbacks when no tenant-specific override exists.
- Provide consistent defaults for new tenants.

### Resolution examples

#### Basic scope override

```
GLOBAL:  { API_TIMEOUT: 5000 }
TENANT:  { API_TIMEOUT: 10000 }
PROCESS: (none)

Result when accessing camunda.vars.env.API_TIMEOUT:
→ 10000 (TENANT value)
```

#### Partial override

```
GLOBAL:  { API_CONFIG: { timeout: 5000, retry: 3, url: "https://api.global.com" } }
TENANT:  { API_CONFIG: { timeout: 10000 } }
PROCESS: (none)

Result when accessing camunda.vars.env.API_CONFIG.timeout:
→ 10000 (TENANT value)

Result when accessing camunda.vars.env.API_CONFIG.retry:
→ null (TENANT defined API_CONFIG as a different object)
```

:::warning
When you override a key at the tenant scope, the entire value at that key is replaced, not merged.
Partial object merging does not occur.
:::

#### Process variable override

```
GLOBAL:  { MAX_AMOUNT: 1000 }
TENANT:  { MAX_AMOUNT: 5000 }
PROCESS: { camunda.vars.env.MAX_AMOUNT: 10000 }

Result when accessing camunda.vars.env.MAX_AMOUNT:
→ 10000 (PROCESS variable)
```

## Multi-tenant considerations

### Tenant isolation

Each tenant's cluster variables are fully isolated. A process running in one tenant cannot access cluster variables defined for another tenant, even with explicit namespace access.

### Global defaults pattern

Define sensible defaults globally and override only what you need at the tenant level:

```
GLOBAL: {
  RATE_LIMITS: {
    requests_per_minute: 100,
    burst_limit: 150,
    concurrent_connections: 10
  }
}

TENANT (premium): {
  RATE_LIMITS: {
    requests_per_minute: 1000,
    burst_limit: 1500,
    concurrent_connections: 100
  }
}
```

## Troubleshoot scope resolution

1. **Check all three scope levels**: Verify values at global, tenant, and process levels.
2. **Use scope-specific namespaces**: Test with `camunda.vars.cluster` and `camunda.vars.tenant` to isolate scope.
3. **Verify tenant context**: Ensure the process is running in the expected tenant.
4. **Look for shadowing**: Check for process variables that might shadow cluster variables.
5. **Validate structure**: Ensure objects have consistent structure across scopes.
