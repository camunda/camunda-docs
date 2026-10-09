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

## Type Parameters

### T

`T`

### E

`E` = `unknown`
