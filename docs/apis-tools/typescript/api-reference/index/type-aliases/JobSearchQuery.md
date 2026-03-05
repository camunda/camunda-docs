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

Defined in: [gen/types.gen.ts:3499](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3499)

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
