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

Defined in: [gen/types.gen.ts:7124](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7124)

Pagination criteria. Can use offset-based pagination (from/limit) OR cursor-based pagination (after/before + limit), but not both.
