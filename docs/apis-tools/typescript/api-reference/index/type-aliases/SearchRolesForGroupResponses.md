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

Defined in: [gen/types.gen.ts:11247](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11247)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:11251](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11251)

The roles assigned to the group.

#### Type Declaration

##### items

```ts
items: RoleResult[];
```

The matching roles.
