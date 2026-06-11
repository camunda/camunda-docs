---
title: "Type Alias: ExpressionEvaluationRequest"
sidebar_label: "ExpressionEvaluationRequest"
mdx:
  format: md
---

# Type Alias: ExpressionEvaluationRequest

```ts
type ExpressionEvaluationRequest = object;
```

## Properties

### expression

```ts
expression: string;
```

The expression to evaluate (e.g., "=x + y")

---

### scopeKey?

```ts
optional scopeKey?: ScopeKey;
```

Key of the process instance or element instance whose variables should be made visible
to the expression. Use a process instance key to evaluate against the process instance
scope, or an element instance key to evaluate against that element instance scope. If
omitted, the expression is evaluated unscoped, using only cluster variables
and request-body variables.

---

### tenantId?

```ts
optional tenantId?: string;
```

Required when the expression references tenant-scoped cluster variables

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Optional variables for expression evaluation. These variables are only used for the current evaluation and do not persist beyond it.
