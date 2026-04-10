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
optional body?: UserTaskUpdateRequest;
```

---

### path

```ts
path: object;
```

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to update.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/user-tasks/{userTaskKey}";
```
