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

Defined in: [gen/types.gen.ts:7812](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7812)

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

Defined in: [gen/types.gen.ts:7816](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7816)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7817](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7817)
