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

Defined in: [resultClient.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/resultClient.ts#L19)

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
