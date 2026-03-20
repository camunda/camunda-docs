---
title: "Type Alias: ProcessInstanceSearchQuery"
sidebar_label: "ProcessInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSearchQuery

```ts
type ProcessInstanceSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5610](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5610)

Process instance search request.

## Type Declaration

### filter?

```ts
optional filter: ProcessInstanceFilter;
```

The process instance search filters.

### sort?

```ts
optional sort: ProcessInstanceSearchQuerySortRequest[];
```

Sort field criteria.
