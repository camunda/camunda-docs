---
title: "Type Alias: FetchPage<TItem, TBody>"
sidebar_label: "FetchPage<TItem, TBody>"
mdx:
  format: md
---

# Type Alias: FetchPage\<TItem, TBody\>

```ts
type FetchPage<TItem, TBody> = (
  body,
  signal?,
  isFirstPage?
) => Promise<SearchResponse<TItem>>;
```

Fetches one page for a given body. Decoupled from the facade's `ec` arg.

`isFirstPage` is `true` only for the initial fetch of _this_ iteration run
(each `pages()`/`items()`/`toArray()` call starts a fresh run). Adapters that
carry per-first-page state (e.g. an eventual-consistency window) must key off
this flag rather than closure state so that reusing a paginator, or consuming
two views concurrently, does not leak first-page behaviour across iterators.

## Type Parameters

### TItem

`TItem`

### TBody

`TBody` _extends_ [`SearchBody`](SearchBody.md)

## Parameters

### body

`TBody`

### signal?

`AbortSignal`

### isFirstPage?

`boolean`

## Returns

`Promise`\<[`SearchResponse`](../interfaces/SearchResponse.md)\<`TItem`\>\>
