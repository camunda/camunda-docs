---
title: "Type Alias: AuthorizationSearchQuery"
sidebar_label: "AuthorizationSearchQuery"
mdx:
  format: md
---

# Type Alias: AuthorizationSearchQuery

```ts
type AuthorizationSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:588](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L588)

## Type Declaration

### filter?

```ts
optional filter: AuthorizationFilter;
```

The authorization search filters.

### sort?

```ts
optional sort: AuthorizationSearchQuerySortRequest[];
```

Sort field criteria.
