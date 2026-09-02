---
title: "Type Alias: JobError"
sidebar_label: "JobError"
mdx:
  format: md
---

# Type Alias: JobError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type JobError = RetryableJobError | TerminalJobError;
```

The typed error channel a job handler may fail with.
