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

Defined in: [gen/types.gen.ts:4252](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4252)

Job search response.

## Type Declaration

### items

```ts
items: JobSearchResult[];
```

The matching jobs.
