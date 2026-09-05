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

### leaseToken?

```ts
optional leaseToken?: string | null;
```

The token identifying a leased job's activation, obtained from `ActivatedJobResult.leaseToken`.
For a leased job, the matching token must be supplied to prove the command comes from the worker that holds the current lease; a command with no token is rejected. A command carrying a stale token is likewise rejected, fencing the job against a superseded activation (for example, after the job timed out or failed and was re-activated by another worker).
A job that was activated without a lease requires no token.

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
