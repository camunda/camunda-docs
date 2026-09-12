---
title: "Interface: Paginator<TItem>"
sidebar_label: "Paginator<TItem>"
mdx:
  format: md
---

# Interface: Paginator\<TItem\>

## Extends

- `AsyncIterable`\<[`SearchResponse`](SearchResponse.md)\<`TItem`\>\>

## Type Parameters

### TItem

`TItem`

## Methods

### items()

```ts
items(): AsyncGenerator<TItem, void, void>;
```

Yields individual items across all pages (`yield*`-flattened).

#### Returns

`AsyncGenerator`\<`TItem`, `void`, `void`\>

---

### pages()

```ts
pages(): AsyncGenerator<SearchResponse<TItem>, void, void>;
```

Yields whole pages, fetching each lazily as it is consumed.

#### Returns

`AsyncGenerator`\<[`SearchResponse`](SearchResponse.md)\<`TItem`\>, `void`, `void`\>

---

### toArray()

```ts
toArray(): Promise<TItem[]>;
```

Eagerly drains every item into an array. Bounded result sets only.

#### Returns

`Promise`\<`TItem`[]\>
