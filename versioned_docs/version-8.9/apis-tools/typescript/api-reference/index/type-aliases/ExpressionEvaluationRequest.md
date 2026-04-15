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
