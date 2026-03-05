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

Defined in: [gen/types.gen.ts:2583](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2583)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2587](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2587)

The expression to evaluate (e.g., "=x + y")

---

### tenantId?

```ts
optional tenantId: string;
```

Defined in: [gen/types.gen.ts:2591](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2591)

Required when the expression references tenant-scoped cluster variables
