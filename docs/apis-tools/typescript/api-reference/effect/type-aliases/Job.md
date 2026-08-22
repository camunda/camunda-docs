---
title: "Type Alias: Job"
sidebar_label: "Job"
mdx:
  format: md
---

# Type Alias: Job

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type Job = ActivatedJobResult;
```

A single activated job handed to an Effect handler. This is the raw activation
payload (variables + custom headers + lifecycle keys); acknowledgement is driven
by the value/error the handler's `Effect` produces, not by imperative methods.
