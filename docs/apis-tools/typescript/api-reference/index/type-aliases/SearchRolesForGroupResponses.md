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

Defined in: [gen/types.gen.ts:11361](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11361)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:11365](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11365)

The roles assigned to the group.

#### Type Declaration

##### items

```ts
items: RoleResult[];
```

The matching roles.
