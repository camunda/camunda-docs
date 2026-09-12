---
title: "Type Alias: CompleteVars"
sidebar_label: "CompleteVars"
mdx:
  format: md
---

# Type Alias: CompleteVars

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type CompleteVars =
  | {
      [key: string]: unknown;
    }
  | void
  | undefined;
```

Variables to complete a job with. `void`/`undefined` completes with no variables.
