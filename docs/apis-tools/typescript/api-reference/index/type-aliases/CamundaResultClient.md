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

Defined in: [resultClient.ts:48](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/resultClient.ts#L48)

## Type Declaration

### inner

```ts
inner: CamundaClient;
```
