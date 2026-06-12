---
title: "Interface: TypedVariablePage"
sidebar_label: "TypedVariablePage"
mdx:
  format: md
---

# Interface: TypedVariablePage

One page of variable search results.

## Properties

### endCursor

```ts
endCursor: string | null;
```

Cursor for the next page, or `null` when there are no more pages.

---

### items

```ts
items: readonly TypedVariableItem[];
```
