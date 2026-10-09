---
title: "Type Alias: CamundaResultClient"
sidebar_label: "CamundaResultClient"
mdx:
  format: md
---

# Type Alias: CamundaResultClient

```ts
type CamundaResultClient = object & {
  [K in keyof CamundaClient]: CamundaClient[K] extends (
    a: infer A
  ) => Promise<infer R>
    ? (a: A) => Promise<Result<R>>
    : CamundaClient[K] extends (a: infer A) => any
      ? (
          a: A
        ) =>
          | Promise<Result<ReturnType<CamundaClient[K]>>>
          | ReturnType<CamundaClient[K]>
      : CamundaClient[K];
};
```

## Type Declaration

### inner

```ts
inner: CamundaClient;
```
