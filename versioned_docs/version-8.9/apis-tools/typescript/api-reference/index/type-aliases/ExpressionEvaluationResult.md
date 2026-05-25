---
title: "Type Alias: ExpressionEvaluationResult"
sidebar_label: "ExpressionEvaluationResult"
mdx:
  format: md
---

# Type Alias: ExpressionEvaluationResult

```ts
type ExpressionEvaluationResult = object;
```

## Properties

### expression

```ts
expression: string;
```

The evaluated expression

---

### result

```ts
result: unknown;
```

The result value. Its type can vary.

---

### warnings

```ts
warnings: ExpressionEvaluationWarningItem[];
```

List of warnings generated during expression evaluation
