---
title: "Interface: OperationOptions"
sidebar_label: "OperationOptions"
mdx:
  format: md
---

# Interface: OperationOptions

Defined in: [runtime/retry.ts:26](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/retry.ts#L26)

Per-call options for individual SDK method invocations.

## Properties

### retry?

```ts
optional retry: false | Partial<HttpRetryPolicy>;
```

Defined in: [runtime/retry.ts:31](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/retry.ts#L31)

Override retry behaviour for this call.
 - Pass `false` to disable retry entirely (single attempt).
 - Pass a partial policy to override specific fields (merged with global config).
