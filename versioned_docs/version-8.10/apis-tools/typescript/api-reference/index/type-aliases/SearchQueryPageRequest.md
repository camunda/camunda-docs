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

Pagination criteria. Can use offset-based pagination (from/limit) OR cursor-based pagination (after/before + limit), but not both.
