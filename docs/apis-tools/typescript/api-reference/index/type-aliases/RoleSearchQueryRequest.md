---
title: "Type Alias: RoleSearchQueryRequest"
sidebar_label: "RoleSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: RoleSearchQueryRequest

```ts
type RoleSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:6275](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6275)

Role search request.

## Type Declaration

### filter?

```ts
optional filter: RoleFilter;
```

The role search filters.

### sort?

```ts
optional sort: RoleSearchQuerySortRequest[];
```

Sort field criteria.
