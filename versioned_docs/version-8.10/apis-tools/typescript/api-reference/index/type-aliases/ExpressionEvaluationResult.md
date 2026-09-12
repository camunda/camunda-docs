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

### referencedSecrets

```ts
referencedSecrets: ExpressionSecretReferenceItem[];
```

The secret references resolved from trusted sources while evaluating the expression: a
`camunda.secrets.<name>` reference used directly in the expression, or a reference
carried by a `SECRET_REFERENCE`-kind cluster variable the expression read. References
appearing only in request-body variables or plain cluster variables are excluded.
Callers use this to know which `camunda.secrets.<name>` occurrences in the result they
may safely resolve.

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
