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

Defined in: [resultClient.ts:6](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/resultClient.ts#L6)

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
