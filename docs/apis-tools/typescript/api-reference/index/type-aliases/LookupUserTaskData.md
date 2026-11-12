---
title: "Type Alias: LookupUserTaskData"
sidebar_label: "LookupUserTaskData"
mdx:
  format: md
---

# Type Alias: LookupUserTaskData

```ts
type LookupUserTaskData = object;
```

## Properties

### body?

```ts
body?: UserTaskLookupRequest;
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

The key of the user task to look up.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/user-tasks/{userTaskKey}/lookup";
```
