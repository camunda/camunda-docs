---
title: "Type Alias: ActivatedJobResultWithoutLeaseToken"
sidebar_label: "ActivatedJobResultWithoutLeaseToken"
mdx:
  format: md
---

# Type Alias: ActivatedJobResultWithoutLeaseToken

```ts
type ActivatedJobResultWithoutLeaseToken = Omit<
  ActivatedJobResult,
  "leaseToken"
> &
  object;
```

`ActivatedJobResult` when `withLease` is absent / a non-matching literal: `leaseToken` is null (the nullable wire shape).

## Type Declaration

### leaseToken?

```ts
optional leaseToken?: null;
```
