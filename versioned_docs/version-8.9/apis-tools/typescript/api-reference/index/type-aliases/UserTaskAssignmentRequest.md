---
title: "Type Alias: UserTaskAssignmentRequest"
sidebar_label: "UserTaskAssignmentRequest"
mdx:
  format: md
---

# Type Alias: UserTaskAssignmentRequest

```ts
type UserTaskAssignmentRequest = object;
```

## Properties

### action?

```ts
optional action?: string | null;
```

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "assign".

---

### allowOverride?

```ts
optional allowOverride?: boolean | null;
```

By default, the task is reassigned if it was already assigned. Set this to `false` to return an error in such cases. The task must then first be unassigned to be assigned again. Use this when you have users picking from group task queues to prevent race conditions.

---

### assignee?

```ts
optional assignee?: string;
```

The assignee for the user task. The assignee must not be empty or `null`.
