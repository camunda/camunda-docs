---
title: "Function: isErr()"
sidebar_label: "isErr()"
mdx:
  format: md
---

# Function: isErr()

```ts
function isErr<T, E>(r): r is { error: E; ok: false };
```

## Type Parameters

### T

`T`

### E

`E`

## Parameters

### r

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

## Returns

`r is { error: E; ok: false }`
