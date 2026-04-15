---
title: "Type Alias: AssignUserTaskData"
sidebar_label: "AssignUserTaskData"
mdx:
  format: md
---

# Type Alias: AssignUserTaskData

```ts
type AssignUserTaskData = object;
```

## Properties

### body

```ts
body: UserTaskAssignmentRequest;
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

The key of the user task to assign.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/user-tasks/{userTaskKey}/assignment";
```
