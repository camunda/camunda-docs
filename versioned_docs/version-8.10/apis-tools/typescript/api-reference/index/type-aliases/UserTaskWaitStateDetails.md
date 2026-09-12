---
title: "Type Alias: UserTaskWaitStateDetails"
sidebar_label: "UserTaskWaitStateDetails"
mdx:
  format: md
---

# Type Alias: UserTaskWaitStateDetails

```ts
type UserTaskWaitStateDetails = BaseWaitStateDetails & object;
```

## Type Declaration

### dueDate

```ts
dueDate: string | null;
```

The due date of the user task, if set.

### taskKey

```ts
taskKey: UserTaskKey;
```

The key of the user task.

### waitStateType

```ts
waitStateType: string;
```

The wait state type discriminator.
