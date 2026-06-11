---
title: "Type Alias: CursorBackwardPagination"
sidebar_label: "CursorBackwardPagination"
mdx:
  format: md
---

# Type Alias: CursorBackwardPagination

```ts
type CursorBackwardPagination = object;
```

Cursor-based backward pagination

## Properties

### before

```ts
before: StartCursor;
```

Use the `startCursor` value from the previous response to fetch the previous page of results.

---

### limit?

```ts
optional limit?: number;
```

The maximum number of items to return in one request.
