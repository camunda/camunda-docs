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

Defined in: [gen/types.gen.ts:2869](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2869)

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
