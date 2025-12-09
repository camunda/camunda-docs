---
id: cluster-variable-core-concepts
title: Core concepts of cluster variables
sidebar_label: "Core concepts"
description: "Learn how cluster variables work, including scope levels, FEEL namespaces, supported types, and resolution priority."
---

Learn how cluster variables work, including scope levels, FEEL namespaces, supported types, and resolution priority.

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

## Access namespaces

Cluster variables are available in FEEL expressions through three namespaces:

- `camunda.vars.cluster`
- `camunda.vars.tenant`
- `camunda.vars.env`

:::tip
Camunda recommends using the `camunda.vars.env` namespace for most use cases.
:::

### `camunda.vars.cluster`

Provides direct access **only** to global-scope variables. Tenant-scope variables are not accessible through this namespace.

**Use when:**

- You want to access only global variables.
- You need to bypass tenant-level overrides.
- You're debugging scope resolution.

For example:

```
camunda.vars.cluster.GLOBAL_DEFAULT_TIMEOUT
```

### `camunda.vars.tenant`

Provides direct access **only** to tenant-scope variables. Global-scope variables are not accessible through this namespace.

**Use when:**

- You want to access only tenant variables.
- You need to check tenant-specific values.
- You're debugging scope resolution.

For example:

```
camunda.vars.tenant.TENANT_SPECIFIC_CONFIG
```

### `camunda.vars.env`

Provides a merged view of both global- and tenant-scope variables, applying automatic priority resolution. This is the recommended namespace for most cases.

**Use when:**

- You want automatic scope resolution.
- You need the most specific value available.
- You're writing portable process definitions.

For example:

```
camunda.vars.env.API_ENDPOINT
camunda.vars.env.CONFIG.timeout
```

## Variable types

Cluster variables support multiple data types to accommodate different configuration needs.

### Simple values

- **String**: Text values for URLs, names, identifiers.
- **Number**: Numeric values for thresholds, timeouts, counts.
- **Boolean**: True/false values for feature flags and toggles.

### Complex values

- **Objects**: Nested structures for grouped configuration.
- **Arrays**: Lists of values

:::note
Access patterns may vary depending on how the array is used.
:::

## Variable resolution priority

Understand the variable resolution priority for predictable behavior. From highest to lowest, the cluster priority order is:

1. Process-level variables.
2. Tenant-scope cluster variables.
3. Global-scope cluster variables.

When the same key exists at multiple levels, the highest priority value is used. This enables a cascading configuration pattern where more specific contexts override broader ones.
