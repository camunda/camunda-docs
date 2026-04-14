---
title: "Type Alias: JobResultUserTask"
sidebar_label: "JobResultUserTask"
mdx:
  format: md
---

# Type Alias: JobResultUserTask

```ts
type JobResultUserTask = {
  corrections?: JobResultCorrections;
  denied?: boolean | null;
  deniedReason?: string | null;
  type?: string;
} | null;
```

Job result details for a user task completion, optionally including a denial reason and corrected task properties.

## Union Members

### Type Literal

```ts
{
  corrections?: JobResultCorrections;
  denied?: boolean | null;
  deniedReason?: string | null;
  type?: string;
}
```

#### corrections?

```ts
optional corrections?: JobResultCorrections;
```

#### denied?

```ts
optional denied?: boolean | null;
```

Indicates whether the worker denies the work, i.e. explicitly doesn't approve it. For example, a user task listener can deny the completion of a task by setting this flag to true. In this example, the completion of a task is represented by a job that the worker can complete as denied. As a result, the completion request is rejected and the task remains active. Defaults to false.

#### deniedReason?

```ts
optional deniedReason?: string | null;
```

The reason provided by the user task listener for denying the work.

#### type?

```ts
optional type?: string;
```

Used to distinguish between different types of job results.

---

`null`
