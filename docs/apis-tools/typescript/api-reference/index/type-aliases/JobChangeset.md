---
title: "Type Alias: JobChangeset"
sidebar_label: "JobChangeset"
mdx:
  format: md
---

# Type Alias: JobChangeset

```ts
type JobChangeset = object;
```

JSON object with changed job attribute values. The job cannot be completed or failed with this endpoint, use the complete job or fail job endpoints instead.

## Properties

### priority?

```ts
priority?: number | null;
```

The new priority for the job. Higher values indicate higher priority.

---

### retries?

```ts
retries?: number | null;
```

The new number of retries for the job.

---

### timeout?

```ts
timeout?: number | null;
```

The new timeout for the job in milliseconds.
