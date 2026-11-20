---
title: "Type Alias: DomainError"
sidebar_label: "DomainError"
mdx:
  format: md
---

# Type Alias: DomainError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type DomainError =
  | CamundaValidationError
  | EventualConsistencyTimeout
  | HttpError
  | CamundaGenericError;
```

The typed error channel for every Effect the client produces.
