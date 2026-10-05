---
title: "Interface: EffectPaginateOptions<TData>"
sidebar_label: "EffectPaginateOptions<TData>"
mdx:
  format: md
---

# Interface: EffectPaginateOptions\<TData\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

Options for the Effect client's `.paginate`.

## Type Parameters

### TData

`TData` = `unknown`

## Properties

### consistency?

```ts
readonly optional consistency?: ConsistencyOptions<TData>;
```

Eventual-consistency controls forwarded to the underlying search call. Defaults
to `{ waitUpToMs: 0 }`. Only the **first** page honours this window: once paging
is under way an empty page is end-of-results, not a not-yet-consistent read.

---

### maxPages?

```ts
readonly optional maxPages?: number;
```

Safety cap on pages fetched (default: unbounded). A non-positive value fetches
no pages at all — the cap is enforced _before_ the first request.

---

### mode?

```ts
readonly optional mode?: PaginationMode;
```

How to advance. `auto` prefers a cursor, falls back to offset.
