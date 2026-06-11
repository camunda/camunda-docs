---
title: "Type Alias: DeleteDecisionInstanceData"
sidebar_label: "DeleteDecisionInstanceData"
mdx:
  format: md
---

# Type Alias: DeleteDecisionInstanceData

```ts
type DeleteDecisionInstanceData = object;
```

## Properties

### body?

```ts
optional body?:
  | {
  operationReference?: OperationReference;
}
  | null;
```

---

### path

```ts
path: object;
```

#### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the decision evaluation to delete.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/decision-instances/{decisionEvaluationKey}/deletion";
```
