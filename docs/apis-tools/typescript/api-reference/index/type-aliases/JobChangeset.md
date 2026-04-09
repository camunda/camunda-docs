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

### retries?

```ts
optional retries?: number | null;
```

The new number of retries for the job.

---

### timeout?

```ts
optional timeout?: number | null;
```

The new timeout for the job in milliseconds.
