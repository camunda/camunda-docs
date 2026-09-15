---
title: "Type Alias: GetDecisionInstanceData"
sidebar_label: "GetDecisionInstanceData"
mdx:
  format: md
---

# Type Alias: GetDecisionInstanceData

```ts
type GetDecisionInstanceData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

The assigned key of the decision instance, which acts as a unique identifier for this decision instance.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/decision-instances/{decisionEvaluationInstanceKey}";
```
