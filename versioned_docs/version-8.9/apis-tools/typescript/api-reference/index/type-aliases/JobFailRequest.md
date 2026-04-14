---
title: "Type Alias: JobFailRequest"
sidebar_label: "JobFailRequest"
mdx:
  format: md
---

# Type Alias: JobFailRequest

```ts
type JobFailRequest = object;
```

## Properties

### errorMessage?

```ts
optional errorMessage?: string;
```

An optional error message describing why the job failed; if not provided, an empty string is used.

---

### retries?

```ts
optional retries?: number;
```

The amount of retries the job should have left

---

### retryBackOff?

```ts
optional retryBackOff?: number;
```

An optional retry back off for the failed job. The job will not be retryable before the current time plus the back off time. The default is 0 which means the job is retryable immediately.

---

### variables?

```ts
optional variables?: object;
```

JSON object that will instantiate the variables at the local scope of the job's associated task.

#### Index Signature

```ts
[key: string]: unknown
```
