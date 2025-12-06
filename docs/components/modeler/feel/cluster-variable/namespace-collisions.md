---
id: cluster-variable-namespace-collisions
title: Namespace collisions
sidebar_label: "Namespace collisions"
description: "Understand namespace collisions."
---

Understand namespace collisions. They occur when the same variable key is defined with different structures or values across multiple scopes.

While the priority system determines which value is used, certain collision patterns can lead to unexpected
behavior.

## Types of collisions

### Process variable shadowing

When you create a process variable that uses the cluster variable namespace, it shadows cluster variables completely.

**Scenario:**

```
GLOBAL: { API_ENDPOINT: "https://api.global.com" }

Process Variable Created:
camunda.vars.env.API_ENDPOINT = "https://api.override.com"
```

**Result:**

```
camunda.vars.env.API_ENDPOINT → "https://api.override.com"
```

**Why this happens**: Process variables have the highest priority in the resolution hierarchy. When you namespace a
process variable under `camunda.vars.env`, it takes precedence over cluster variables.

**Use case**: This is intentional behavior that allows runtime override of cluster configuration when necessary.

**Best practice**: Use this pattern sparingly and document it clearly when you do. Consider using a different namespace
for process variables to avoid confusion.

### Structural collisions across scopes

This is the most common source of unexpected behavior. It occurs when the same key has different data types or
structures at different scopes.

**Scenario:**

```
TENANT: { CONFIG_KEY: "simple string value" }
GLOBAL: { CONFIG_KEY: { nested: "object", with: "properties" } }
```

**Problem:**

```
camunda.vars.env.CONFIG_KEY → "simple string value" (TENANT wins)
camunda.vars.env.CONFIG_KEY.nested → null (trying to access property on string)
```

**Why this happens**: The TENANT scope takes priority and returns a string. The GLOBAL nested object is never evaluated.
Attempting to access properties on a string returns null.

## Detailed collision example

**Setup:**

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

**Access Attempts and Results:**

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

## Preventing namespace collisions

### Consistent data structures

Always use the same data type and structure for a given key across all scopes.

**Good Example:**

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

Both scopes use the same object structure, just with different values.

### Use distinct keys

When you need fundamentally different structures, use different key names.

**Good Example:**

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

### Document your schema

Maintain a schema registry or documentation that specifies:

- Expected keys at each scope
- Data type and structure for each key
- Which keys can be overridden at TENANT scope
- Deprecation notices for keys being phased out

## Collision detection patterns

### Runtime null checking

Always check for null when accessing nested properties:

```
if camunda.vars.env.CONFIG.nested_value != null
  then camunda.vars.env.CONFIG.nested_value
  else "default"
```

## Process variable namespace best practices

### Avoid using camunda.vars namespace

To prevent shadowing cluster variables, avoid creating process variables that use the `camunda.vars` namespace.

**Problematic:**

```
Set process variable: camunda.vars.env.TIMEOUT = 5000
```

**Better:**

```
Set process variable: processTimeout = 5000
```

### When override is intentional

If you deliberately want to override cluster variables at the process level, document this behavior explicitly in your
process documentation.
