---
title: "Function: paginate()"
sidebar_label: "paginate()"
mdx:
  format: md
---

# Function: paginate()

```ts
function paginate<TItem, TBody>(fetchPage, body, opts?): Paginator<TItem>;
```

Wrap a search operation as a lazy, cancelable async stream.

## Type Parameters

### TItem

`TItem`

### TBody

`TBody` _extends_ [`SearchBody`](../type-aliases/SearchBody.md)

## Parameters

### fetchPage

[`FetchPage`](../type-aliases/FetchPage.md)\<`TItem`, `TBody`\>

### body

`TBody`

### opts?

[`PaginateOptions`](../interfaces/PaginateOptions.md) = `{}`

## Returns

[`Paginator`](../interfaces/Paginator.md)\<`TItem`\>

## Example

const p = paginate((b, s) => searchProcessInstances(b, { ... }), body);
for await (const pi of p.items()) { ... } // item-by-item
for await (const page of p.pages()) { ... } // page-by-page
