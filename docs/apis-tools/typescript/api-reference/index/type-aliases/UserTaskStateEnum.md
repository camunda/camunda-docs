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

The state of the user task.
Note: FAILED state is only for legacy job-worker-based tasks.
