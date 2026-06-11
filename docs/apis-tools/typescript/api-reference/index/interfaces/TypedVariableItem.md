---
title: "Interface: TypedVariableItem"
sidebar_label: "TypedVariableItem"
mdx:
  format: md
---

# Interface: TypedVariableItem

A single variable item from a search page (the subset the collector needs).

## Properties

### name

```ts
name: string;
```

---

### scopeKey

```ts
scopeKey: string;
```

The scope key the variable is directly defined in.

---

### value

```ts
value: string;
```

The variable value, serialized as JSON (the wire representation).
