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

Defined in: [resultClient.ts:6](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/resultClient.ts#L6)

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
