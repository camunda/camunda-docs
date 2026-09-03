---
title: "Interface: SearchPaginateOptions<TData>"
sidebar_label: "SearchPaginateOptions<TData>"
mdx:
  format: md
---

# Interface: SearchPaginateOptions\<TData\>

Options for `search*.paginate(...)`: page controls + per-call forwarding.

## Extends

- [`PaginateOptions`](PaginateOptions.md)

## Type Parameters

### TData

`TData`

## Properties

### consistency?

```ts
optional consistency?: ConsistencyOptions<TData>;
```

Eventual-consistency controls forwarded to the underlying search call.
Defaults to `{ waitUpToMs: 0 }` (ignore eventual consistency) when omitted.

Only the **first** page honours this window: once paging is under way an
empty page is a legitimate end-of-results, not a not-yet-consistent read,
so subsequent (and exhaustion-probe) fetches always use `{ waitUpToMs: 0 }`.
Waiting on those would make the terminal fetch of an exactly-full or empty
result set block for the whole window and then throw.

---

### maxPages?

```ts
optional maxPages?: number;
```

Safety cap on pages fetched (default: unbounded). A non-positive value
(`0` or negative) fetches no pages at all — the cap is enforced _before_
the first request, so it is always honoured exactly.

#### Inherited from

[`PaginateOptions`](PaginateOptions.md).[`maxPages`](PaginateOptions.md#maxpages)

---

### mode?

```ts
optional mode?: PaginationMode;
```

How to advance. `auto` prefers a cursor, falls back to offset.

#### Inherited from

[`PaginateOptions`](PaginateOptions.md).[`mode`](PaginateOptions.md#mode)

---

### signal?

```ts
optional signal?: AbortSignal;
```

Abort between pages; a fired signal stops further fetches.

#### Inherited from

[`PaginateOptions`](PaginateOptions.md).[`signal`](PaginateOptions.md#signal)
