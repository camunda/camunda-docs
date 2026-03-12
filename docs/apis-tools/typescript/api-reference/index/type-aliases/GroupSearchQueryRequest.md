---
title: "Type Alias: GroupSearchQueryRequest"
sidebar_label: "GroupSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: GroupSearchQueryRequest

```ts
type GroupSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:3199](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3199)

Group search request.

## Type Declaration

### filter?

```ts
optional filter: GroupFilter;
```

The group search filters.

### sort?

```ts
optional sort: GroupSearchQuerySortRequest[];
```

Sort field criteria.
