---
title: "Type Alias: SearchUserTaskEffectiveVariablesData"
sidebar_label: "SearchUserTaskEffectiveVariablesData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskEffectiveVariablesData

```ts
type SearchUserTaskEffectiveVariablesData = object;
```

## Properties

### body?

```ts
optional body?: UserTaskEffectiveVariableSearchQueryRequest;
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

The key of the user task.

---

### query?

```ts
optional query?: object;
```

#### truncateValues?

```ts
optional truncateValues?: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/user-tasks/{userTaskKey}/effective-variables/search";
```
