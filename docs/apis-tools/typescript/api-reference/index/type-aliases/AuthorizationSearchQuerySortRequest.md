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

Defined in: [gen/types.gen.ts:597](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L597)

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

Defined in: [gen/types.gen.ts:601](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L601)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:602](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L602)
