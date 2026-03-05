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

Defined in: [resultClient.ts:6](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/resultClient.ts#L6)

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
