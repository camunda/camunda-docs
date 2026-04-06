---
title: "Type Alias: UserTaskSearchQuerySortRequest"
sidebar_label: "UserTaskSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQuerySortRequest

```ts
type UserTaskSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:7516](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7516)

## Properties

### field

```ts
field:
  | "creationDate"
  | "completionDate"
  | "followUpDate"
  | "dueDate"
  | "priority"
  | "name";
```

Defined in: [gen/types.gen.ts:7520](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7520)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7521](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7521)
