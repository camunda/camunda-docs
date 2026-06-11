---
title: "Type Alias: CursorForwardPagination"
sidebar_label: "CursorForwardPagination"
mdx:
  format: md
---

# Type Alias: CursorForwardPagination

```ts
type CursorForwardPagination = object;
```

Cursor-based forward pagination

## Properties

### after

```ts
after: EndCursor;
```

Use the `endCursor` value from the previous response to fetch the next page of results.

---

### limit?

```ts
optional limit?: number;
```

The maximum number of items to return in one request.
