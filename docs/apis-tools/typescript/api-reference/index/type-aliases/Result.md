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

Defined in: [resultClient.ts:4](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/resultClient.ts#L4)

## Type Parameters

### T

`T`

### E

`E` = `unknown`
