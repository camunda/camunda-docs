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

Defined in: [gen/types.gen.ts:7038](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7038)

Pagination criteria. Can use offset-based pagination (from/limit) OR cursor-based pagination (after/before + limit), but not both.
