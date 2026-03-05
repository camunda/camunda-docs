---
title: "Type Alias: Result<T, E>"
sidebar_label: "Result<T, E>"
mdx:
  format: md
---

# Type Alias: Result\<T, E\>

```ts
type Result<T, E> = 
  | {
  ok: true;
  value: T;
}
  | {
  error: E;
  ok: false;
};
```

Defined in: [resultClient.ts:4](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/resultClient.ts#L4)

## Type Parameters

### T

`T`

### E

`E` = `unknown`
