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

Job search request.

## Type Declaration

### filter?

```ts
optional filter?: JobFilter;
```

The job search filters.

### sort?

```ts
optional sort?: JobSearchQuerySortRequest[];
```

Sort field criteria.
