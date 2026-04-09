---
title: "Type Alias: CompleteUserTaskData"
sidebar_label: "CompleteUserTaskData"
mdx:
  format: md
---

# Type Alias: CompleteUserTaskData

```ts
type CompleteUserTaskData = object;
```

## Properties

### body?

```ts
optional body?: UserTaskCompletionRequest;
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

The key of the user task to complete.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/user-tasks/{userTaskKey}/completion";
```
