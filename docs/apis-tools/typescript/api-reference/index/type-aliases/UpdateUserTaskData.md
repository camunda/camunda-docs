---
title: "Type Alias: UpdateUserTaskData"
sidebar_label: "UpdateUserTaskData"
mdx:
  format: md
---

# Type Alias: UpdateUserTaskData

```ts
type UpdateUserTaskData = object;
```

## Properties

### body?

```ts
body?: UserTaskUpdateRequest;
```

---

### path

```ts
path: object;
```

#### userTaskKey

```ts
userTaskKey: UserTaskKeyWritable;
```

The key of the user task to update.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/user-tasks/{userTaskKey}";
```
