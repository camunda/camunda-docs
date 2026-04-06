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

Defined in: [resultClient.ts:6](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/resultClient.ts#L6)

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
