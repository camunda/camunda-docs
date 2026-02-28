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

Defined in: [gen/types.gen.ts:3615](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3615)

Job search response.

## Type Declaration

### items?

```ts
optional items: JobSearchResult[];
```

The matching jobs.
