---
title: "Type Alias: SearchQueryPageRequest"
sidebar_label: "SearchQueryPageRequest"
mdx:
  format: md
---

# Type Alias: SearchQueryPageRequest

```ts
type SearchQueryPageRequest =
  | LimitPagination
  | OffsetPagination
  | CursorForwardPagination
  | CursorBackwardPagination;
```

Defined in: [gen/types.gen.ts:6404](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6404)

Pagination criteria. Can use offset-based pagination (from/limit) OR cursor-based pagination (after/before + limit), but not both.
