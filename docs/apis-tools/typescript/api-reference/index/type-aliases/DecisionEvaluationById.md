---
title: "Type Alias: DecisionEvaluationById"
sidebar_label: "DecisionEvaluationById"
mdx:
  format: md
---

# Type Alias: DecisionEvaluationById

```ts
type DecisionEvaluationById = object;
```

Decision evaluation by ID

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

The ID of the decision to be evaluated.
When using the decision ID, the latest
deployed version of the decision is used.

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
