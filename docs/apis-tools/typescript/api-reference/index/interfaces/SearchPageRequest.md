---
title: "Interface: SearchPageRequest"
sidebar_label: "SearchPageRequest"
mdx:
  format: md
---

# Interface: SearchPageRequest

The `page` field of a search request body (cursor-forward or offset).

## Indexable

```ts
[k: string]: unknown
```

## Properties

### after?

```ts
optional after?: string;
```

Cursor-forward: `endCursor` of the previous page.

---

### before?

```ts
optional before?: string;
```

Cursor-backward: `startCursor` of the previous page (mutually exclusive with `after`/`from`).

---

### from?

```ts
optional from?: number;
```

Offset: index to start from.

---

### limit?

```ts
optional limit?: number;
```
