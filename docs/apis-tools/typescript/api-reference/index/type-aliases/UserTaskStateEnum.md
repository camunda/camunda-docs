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

Defined in: [gen/types.gen.ts:7840](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7840)

The state of the user task.
Note: FAILED state is only for legacy job-worker-based tasks.
