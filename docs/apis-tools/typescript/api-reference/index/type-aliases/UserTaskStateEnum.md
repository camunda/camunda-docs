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

Defined in: [gen/types.gen.ts:7726](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7726)

The state of the user task.
Note: FAILED state is only for legacy job-worker-based tasks.
