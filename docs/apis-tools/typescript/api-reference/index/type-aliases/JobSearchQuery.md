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

Defined in: [gen/types.gen.ts:4065](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4065)

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
