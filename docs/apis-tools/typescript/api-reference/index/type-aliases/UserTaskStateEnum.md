---
title: "Type Alias: UserTaskStateEnum"
sidebar_label: "UserTaskStateEnum"
mdx:
  format: md
---

# Type Alias: UserTaskStateEnum

```ts
type UserTaskStateEnum =
  | "CREATING"
  | "CREATED"
  | "ASSIGNING"
  | "UPDATING"
  | "COMPLETING"
  | "COMPLETED"
  | "CANCELING"
  | "CANCELED"
  | "FAILED";
```

Defined in: [gen/types.gen.ts:7869](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7869)

The state of the user task.
Note: FAILED state is only for legacy job-worker-based tasks.
