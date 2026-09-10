---
title: "Function: nextPageRequest()"
sidebar_label: "nextPageRequest()"
mdx:
  format: md
---

# Function: nextPageRequest()

```ts
function nextPageRequest<TItem, TBody>(body, response, mode?): TBody | null;
```

Compute the next request body from the previous body + response, or `null`
when no further page exists. Pure — the async generator is built on top of it.

## Type Parameters

### TItem

`TItem`

### TBody

`TBody` _extends_ [`SearchBody`](../type-aliases/SearchBody.md)

## Parameters

### body

`TBody`

### response

[`SearchResponse`](../interfaces/SearchResponse.md)\<`TItem`\>

### mode?

[`PaginationMode`](../type-aliases/PaginationMode.md) = `'auto'`

## Returns

`TBody` \| `null`
