---
title: "Type Alias: SdkError"
sidebar_label: "SdkError"
mdx:
  format: md
---

# Type Alias: SdkError

```ts
type SdkError =
  | HttpSdkError
  | ValidationSdkError
  | AuthSdkError
  | NetworkSdkError
  | CancelSdkError;
```

Defined in: [runtime/errors.ts:41](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/errors.ts#L41)
