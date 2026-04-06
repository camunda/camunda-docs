---
title: "Type Alias: BusinessId"
sidebar_label: "BusinessId"
mdx:
  format: md
---

# Type Alias: BusinessId

```ts
type BusinessId = CamundaKey<"BusinessId">;
```

Defined in: [gen/types.gen.ts:3359](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3359)

An optional, user-defined string identifier that identifies the process instance
within the scope of a process definition (scoped by tenant). If provided and uniqueness
enforcement is enabled, the engine will reject creation if another root process instance
with the same business id is already active for the same process definition.
Note that any active child process instances with the same business id are not taken into account.
