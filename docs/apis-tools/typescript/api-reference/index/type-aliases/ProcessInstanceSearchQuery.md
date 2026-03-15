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

Defined in: [gen/types.gen.ts:6283](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6283)

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
