---
title: "Type Alias: JobSearchQueryResult"
sidebar_label: "JobSearchQueryResult"
mdx:
  format: md
---

# Type Alias: JobSearchQueryResult

```ts
type JobSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:4249](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4249)

Job search response.

## Type Declaration

### items

```ts
items: JobSearchResult[];
```

The matching jobs.
