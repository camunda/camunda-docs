---
title: "Type Alias: ActivatedJobResultWithJobLeaseToken"
sidebar_label: "ActivatedJobResultWithJobLeaseToken"
mdx:
  format: md
---

# Type Alias: ActivatedJobResultWithJobLeaseToken

```ts
type ActivatedJobResultWithJobLeaseToken = Omit<
  ActivatedJobResult,
  "jobLeaseToken"
> &
  object;
```

`ActivatedJobResult` when `withLease === true`: `jobLeaseToken` is present (required, non-null).

## Type Declaration

### jobLeaseToken

```ts
jobLeaseToken: NonNullable<ActivatedJobResult["jobLeaseToken"]>;
```
