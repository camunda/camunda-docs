---
title: "Function: createCamundaResultClient()"
sidebar_label: "createCamundaResultClient()"
mdx:
  format: md
---

# Function: createCamundaResultClient()

```ts
function createCamundaResultClient(options?): CamundaResultClient;
```

Defined in: [resultClient.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/resultClient.ts#L19)

**`Experimental`**

This feature is under development and is not guaranteed to be fully tested or stable.

## Parameters

### options?

[`CamundaOptions`](../interfaces/CamundaOptions.md)

## Returns

[`CamundaResultClient`](../type-aliases/CamundaResultClient.md)

## Description

Factory returning a proxy that mirrors the CamundaClient surface but never throws.
All async returning methods (Promise or CancelablePromise) are wrapped into Promise<Result<..>>.
Synchronous utility methods (e.g. logger(), getConfig()) are passed through unchanged.
