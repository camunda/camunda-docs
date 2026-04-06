---
title: "Type Alias: AuthorizationSearchQuerySortRequest"
sidebar_label: "AuthorizationSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationSearchQuerySortRequest

```ts
type AuthorizationSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:593](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L593)

## Properties

### field

```ts
field:
  | "ownerId"
  | "ownerType"
  | "resourceId"
  | "resourcePropertyName"
  | "resourceType";
```

Defined in: [gen/types.gen.ts:597](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L597)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:598](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L598)
