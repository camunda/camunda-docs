---
title: "Type Alias: ActivatedJobResultWithoutJobLeaseToken"
sidebar_label: "ActivatedJobResultWithoutJobLeaseToken"
mdx:
  format: md
---

# Type Alias: ActivatedJobResultWithoutJobLeaseToken

```ts
type ActivatedJobResultWithoutJobLeaseToken = Omit<
  ActivatedJobResult,
  "jobLeaseToken"
> &
  object;
```

`ActivatedJobResult` when `withLease` is absent / a non-matching literal: `jobLeaseToken` is null (the nullable wire shape).

## Type Declaration

### jobLeaseToken?

```ts
optional jobLeaseToken?: null;
```
