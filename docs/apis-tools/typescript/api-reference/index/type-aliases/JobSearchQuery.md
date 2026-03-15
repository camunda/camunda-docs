---
title: "Type Alias: JobSearchQuery"
sidebar_label: "JobSearchQuery"
mdx:
  format: md
---

# Type Alias: JobSearchQuery

```ts
type JobSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:4133](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4133)

Job search request.

## Type Declaration

### filter?

```ts
optional filter: JobFilter;
```

The job search filters.

### sort?

```ts
optional sort: JobSearchQuerySortRequest[];
```

Sort field criteria.
