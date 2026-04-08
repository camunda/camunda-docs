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

Defined in: [gen/types.gen.ts:8051](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8051)

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

Defined in: [gen/types.gen.ts:8055](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8055)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:8056](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8056)
