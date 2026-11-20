---
title: "Type Alias: SearchUserTaskVariablesData"
sidebar_label: "SearchUserTaskVariablesData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskVariablesData

```ts
type SearchUserTaskVariablesData = object;
```

## Properties

### body?

```ts
body?: UserTaskVariableSearchQueryRequest;
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

The key of the user task.

---

### query?

```ts
query?: object;
```

#### truncateValues?

```ts
truncateValues?: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/user-tasks/{userTaskKey}/variables/search";
```
