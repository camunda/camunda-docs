---
title: "Type Alias: DecisionEvaluationByKey"
sidebar_label: "DecisionEvaluationByKey"
mdx:
  format: md
---

# Type Alias: DecisionEvaluationByKey

```ts
type DecisionEvaluationByKey = object;
```

Decision evaluation by key

## Properties

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

---

### tenantId?

```ts
tenantId?: TenantId;
```

The tenant ID of the decision.

---

### variables?

```ts
variables?: object;
```

The decision evaluation variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
