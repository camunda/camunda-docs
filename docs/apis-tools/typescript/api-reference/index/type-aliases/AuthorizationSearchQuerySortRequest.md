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

Defined in: [gen/types.gen.ts:580](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L580)

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

Defined in: [gen/types.gen.ts:584](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L584)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:585](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L585)
