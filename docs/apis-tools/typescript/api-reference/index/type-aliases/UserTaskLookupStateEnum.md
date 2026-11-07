---
title: "Type Alias: UserTaskLookupStateEnum"
sidebar_label: "UserTaskLookupStateEnum"
mdx:
  format: md
---

# Type Alias: UserTaskLookupStateEnum

```ts
type UserTaskLookupStateEnum =
  (typeof UserTaskLookupStateEnum)[keyof typeof UserTaskLookupStateEnum];
```

The lifecycle state of an active user task. A state ending in `-ING` means a change to the
task is in progress, for example waiting for task listeners; the task fields still hold
the values from before the change.
