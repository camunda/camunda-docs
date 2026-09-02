---
title: "Type Alias: JobHandler<A, R>"
sidebar_label: "JobHandler<A, R>"
mdx:
  format: md
---

# Type Alias: JobHandler\<A, R\>

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

```ts
type JobHandler<A, R> = (job) => Effect.Effect<A, JobError, R>;
```

A job handler: consumes a [Job](Job.md), produces completion variables or a [JobError](JobError.md).

## Type Parameters

### A

`A` _extends_ [`CompleteVars`](CompleteVars.md)

### R

`R`

## Parameters

### job

[`Job`](Job.md)

## Returns

`Effect.Effect`\<`A`, [`JobError`](JobError.md), `R`\>
