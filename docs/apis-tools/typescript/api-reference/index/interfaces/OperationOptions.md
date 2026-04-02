---
title: "Interface: OperationOptions"
sidebar_label: "OperationOptions"
mdx:
  format: md
---

# Interface: OperationOptions

Defined in: [runtime/retry.ts:27](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/retry.ts#L27)

Per-call options for individual SDK method invocations.

## Properties

### retry?

```ts
optional retry?: false | Partial<HttpRetryPolicy>;
```

Defined in: [runtime/retry.ts:32](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/retry.ts#L32)

Override retry behaviour for this call.

- Pass `false` to disable retry entirely (single attempt).
- Pass a partial policy to override specific fields (merged with global config).
