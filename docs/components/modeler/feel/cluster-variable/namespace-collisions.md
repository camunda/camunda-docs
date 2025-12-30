---
id: cluster-variable-namespace-collisions
title: Namespace collisions
sidebar_label: "Namespace collisions"
description: "Understand namespace collisions in cluster variables, how scope priority affects variable resolution, and how to safely handle."
---

Understand namespace collisions in cluster variables, how scope priority affects variable resolution, and how to safely handle overrides to avoid unexpected behavior.

## About

Namespace collisions occur when the same variable key is defined differently across scopes (process, tenant, global). While scope priority determines which value is used, mismatched data types or structures can cause unexpected results.

This guide explains common collision types, shows real examples, and shares best practices to prevent or intentionally manage overrides.

## Collision types

The examples below show you common patterns and how to reason about them.

### Process variable shadowing

If you create a process variable using the cluster variable namespace, it completely shadows cluster variables.

#### Scenario

```
GLOBAL: { API_ENDPOINT: "https://api.global.com" }

Process Variable Created:
camunda.vars.env.API_ENDPOINT = "https://api.override.com"
```

#### Result

```
camunda.vars.env.API_ENDPOINT → "https://api.override.com"
```

#### Why this happens

Process variables [have the highest priority](./scope-and-priority.md) in the resolution hierarchy. When you namespace a process variable under `camunda.vars.env`, it takes precedence over cluster variables.

This allows intentional, runtime overrides of cluster configuration when necessary.

:::tip
Use sparingly and document clearly. Prefer a different namespace for process variables to avoid confusion.
:::

### Structural collisions across scopes

It happens when you define the same key with different data types or structures at different scopes.

:::note
This is the most common source of unexpected behavior.
:::

#### Scenario

```
TENANT: { CONFIG_KEY: "simple string value" }
GLOBAL: { CONFIG_KEY: { nested: "object", with: "properties" } }
```

#### Result

```
camunda.vars.env.CONFIG_KEY → "simple string value" (TENANT wins)
camunda.vars.env.CONFIG_KEY.nested → null (trying to access property on string)
```

#### Why this happens

Tenant scope has higher priority and returns a string, so the global object is never evaluated. Accessing properties on a string yields null.

### Detailed collision example

#### Scenario

```
GLOBAL scope:
{
  KEY_1: {
    KEY_2: "hello world",
    KEY_3: "goodbye world"
  }
}

TENANT scope:
{
  KEY_1: "tenant value"
}
```

#### Results

```
camunda.vars.env.KEY_1
→ "tenant value"
✓ Works as expected, TENANT priority

camunda.vars.env.KEY_1.KEY_2
→ null
✗ Unexpected! Trying to access property on string

camunda.vars.cluster.KEY_1.KEY_2
→ "hello world"
✓ Bypasses TENANT scope, accesses GLOBAL directly

camunda.vars.tenant.KEY_1
→ "tenant value"
✓ Direct TENANT access

camunda.vars.tenant.KEY_1.KEY_2
→ null
✓ Correctly returns null (KEY_1 in TENANT is string)
```

## Prevent namespace collisions

Avoid collisions by keeping structures consistent, separating fundamentally different data under different keys, and documenting what each key represents at each scope.

### Keep data structures consistent

Use the same data type and shape for a given key across all scopes.

#### Example

```
GLOBAL: {
  DATABASE_CONFIG: {
    host: "global-db.example.com",
    port: 5432,
    timeout_ms: 5000
  }
}

TENANT: {
  DATABASE_CONFIG: {
    host: "tenant-db.example.com",
    port: 5432,
    timeout_ms: 10000
  }
}
```

Both scopes use the same object structure, with tenant‑specific values.

### Use distinct keys

If the structures differ, store them under different keys to avoid type conflicts.

#### Example

```
GLOBAL: {
  DEFAULT_ENDPOINT: "https://api.global.com",
  DEFAULT_CONFIG: { timeout: 5000, retry: 3 }
}

TENANT: {
  TENANT_ENDPOINT: "https://api.tenant.com",
  TENANT_CONFIG: { timeout: 10000, retry: 5, custom_header: "value" }
}
```

### Detect collisions at runtime

Add simple guards when accessing nested properties to avoid nulls if a higher‑priority scope supplies a different type.

#### Example

```
if camunda.vars.env.CONFIG.nested_value != null
  then camunda.vars.env.CONFIG.nested_value
  else "default"
```

### Document your schema

Maintain a schema registry or documentation that specifies:

- Expected keys at each scope.
- Data type and structure for each key.
- Which keys can be overridden at the tenant scope.
- Deprecation notices for keys being phased out.

## Process variable namespace best practices

### Avoid using `camunda.vars` namespace

To prevent shadowing cluster variables, avoid creating process variables that use the `camunda.vars` namespace.

For example, instead of:

```
Set process variable: camunda.vars.env.TIMEOUT = 5000
```

Do:

```
Set process variable: processTimeout = 5000
```

### When override is intentional

If you need to override a cluster variable at the process level, document the intent and scope in the process documentation so consumers understand why the override exists and where it applies.
