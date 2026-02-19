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

Defined in: [resultClient.ts:4](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/resultClient.ts#L4)

## Type Parameters

### T

`T`

### E

`E` = `unknown`
