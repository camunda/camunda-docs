---
title: "Type Alias: UserTaskVariableSearchQuerySortRequest"
sidebar_label: "UserTaskVariableSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: UserTaskVariableSearchQuerySortRequest

```ts
type UserTaskVariableSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:7802](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7802)

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

Defined in: [gen/types.gen.ts:7806](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7806)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7807](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7807)
