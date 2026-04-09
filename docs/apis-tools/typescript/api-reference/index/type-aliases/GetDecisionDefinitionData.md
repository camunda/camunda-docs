---
title: "Type Alias: GetDecisionDefinitionData"
sidebar_label: "GetDecisionDefinitionData"
mdx:
  format: md
---

# Type Alias: GetDecisionDefinitionData

```ts
type GetDecisionDefinitionData = object;
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

#### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

The assigned key of the decision definition, which acts as a unique identifier for this decision.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/decision-definitions/{decisionDefinitionKey}";
```
