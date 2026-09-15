---
title: "Interface: EffectPaginator<TItem>"
sidebar_label: "EffectPaginator<TItem>"
mdx:
  format: md
---

# Interface: EffectPaginator\<TItem\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

The Effect-flavoured counterpart of a [Paginator](../../index/interfaces/Paginator.md): the same three views
(`pages` / `items` / `toArray`) over a multi-page search, as `Stream`s and an
`Effect` rather than async iterables and a `Promise`.

Every view is lazy — a page is fetched only when pulled — and interruptible:
interrupting the fiber cancels the in-flight page request rather than leaving it
to settle unobserved.

## Type Parameters

### TItem

`TItem`

## Methods

### items()

```ts
items(): Stream<TItem, DomainError>;
```

A `Stream` of individual items, flattened across all pages.

#### Returns

`Stream`\<`TItem`, [`DomainError`](../type-aliases/DomainError.md)\>

---

### pages()

```ts
pages(): Stream<SearchResponse<TItem>, DomainError>;
```

A `Stream` of whole pages, each fetched lazily as it is pulled.

#### Returns

`Stream`\<[`SearchResponse`](../../index/interfaces/SearchResponse.md)\<`TItem`\>, [`DomainError`](../type-aliases/DomainError.md)\>

---

### toArray()

```ts
toArray(): Effect<TItem[], DomainError>;
```

Eagerly drains every item into an array. Bounded result sets only.

#### Returns

`Effect`\<`TItem`[], [`DomainError`](../type-aliases/DomainError.md)\>
