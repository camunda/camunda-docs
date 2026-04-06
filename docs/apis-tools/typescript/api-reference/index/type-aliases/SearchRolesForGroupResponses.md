---
title: "Type Alias: SearchRolesForGroupResponses"
sidebar_label: "SearchRolesForGroupResponses"
mdx:
  format: md
---

# Type Alias: SearchRolesForGroupResponses

```ts
type SearchRolesForGroupResponses = object;
```

Defined in: [gen/types.gen.ts:11395](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11395)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:11399](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11399)

The roles assigned to the group.

#### Type Declaration

##### items

```ts
items: RoleResult[];
```

The matching roles.
