---
title: "Type Alias: JobCompletionRequest"
sidebar_label: "JobCompletionRequest"
mdx:
  format: md
---

# Type Alias: JobCompletionRequest

```ts
type JobCompletionRequest = object;
```

## Properties

### result?

```ts
optional result?: JobResult;
```

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

The variables to complete the job with.
