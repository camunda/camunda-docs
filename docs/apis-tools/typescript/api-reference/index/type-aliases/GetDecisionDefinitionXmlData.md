---
title: "Type Alias: GetDecisionDefinitionXmlData"
sidebar_label: "GetDecisionDefinitionXmlData"
mdx:
  format: md
---

# Type Alias: GetDecisionDefinitionXmlData

```ts
type GetDecisionDefinitionXmlData = object;
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
url: "/decision-definitions/{decisionDefinitionKey}/xml";
```
