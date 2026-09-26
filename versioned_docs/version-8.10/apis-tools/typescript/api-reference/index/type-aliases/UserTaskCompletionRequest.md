---
title: "Type Alias: UserTaskCompletionRequest"
sidebar_label: "UserTaskCompletionRequest"
mdx:
  format: md
---

# Type Alias: UserTaskCompletionRequest

```ts
type UserTaskCompletionRequest = object;
```

## Properties

### action?

```ts
optional action?: string | null;
```

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "complete".

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

The variables to complete the user task with.
