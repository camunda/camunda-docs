---
title: "Interface: PaginateOptions"
sidebar_label: "PaginateOptions"
mdx:
  format: md
---

# Interface: PaginateOptions

## Extended by

- [`SearchPaginateOptions`](SearchPaginateOptions.md)

## Properties

### maxPages?

```ts
optional maxPages?: number;
```

Safety cap on pages fetched (default: unbounded). A non-positive value
(`0` or negative) fetches no pages at all — the cap is enforced _before_
the first request, so it is always honoured exactly.

---

### mode?

```ts
optional mode?: PaginationMode;
```

How to advance. `auto` prefers a cursor, falls back to offset.

---

### signal?

```ts
optional signal?: AbortSignal;
```

Abort between pages; a fired signal stops further fetches.
