---
title: "Type Alias: UserTaskUpdateRequest"
sidebar_label: "UserTaskUpdateRequest"
mdx:
  format: md
---

# Type Alias: UserTaskUpdateRequest

```ts
type UserTaskUpdateRequest = object;
```

## Properties

### action?

```ts
optional action?: string | null;
```

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "update".

---

### changeset?

```ts
optional changeset?: Changeset;
```
