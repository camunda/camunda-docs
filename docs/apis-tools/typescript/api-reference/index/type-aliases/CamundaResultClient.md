---
title: "Type Alias: CamundaResultClient"
sidebar_label: "CamundaResultClient"
mdx:
  format: md
---

# Type Alias: CamundaResultClient

```ts
type CamundaResultClient = object & { [K in keyof CamundaClient]: CamundaClient[K] extends (a: infer A) => Promise<infer R> ? (a: A) => Promise<Result<R>> : CamundaClient[K] extends (a: infer A) => any ? (a: A) => Promise<Result<ReturnType<CamundaClient[K]>>> | ReturnType<CamundaClient[K]> : CamundaClient[K] };
```

Defined in: [resultClient.ts:48](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/resultClient.ts#L48)

## Type Declaration

### inner

```ts
inner: CamundaClient;
```
