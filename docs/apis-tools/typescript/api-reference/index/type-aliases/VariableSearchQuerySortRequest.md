---
title: "Type Alias: VariableSearchQuerySortRequest"
sidebar_label: "VariableSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: VariableSearchQuerySortRequest

```ts
type VariableSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:8022](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8022)

## Properties

### field

```ts
field: 
  | "value"
  | "name"
  | "tenantId"
  | "variableKey"
  | "scopeKey"
  | "processInstanceKey";
```

Defined in: [gen/types.gen.ts:8026](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8026)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:8027](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8027)
