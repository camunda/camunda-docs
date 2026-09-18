---
title: "Type Alias: ActivatedJobResultWithLeaseToken"
sidebar_label: "ActivatedJobResultWithLeaseToken"
mdx:
  format: md
---

# Type Alias: ActivatedJobResultWithLeaseToken

```ts
type ActivatedJobResultWithLeaseToken = Omit<ActivatedJobResult, "leaseToken"> &
  object;
```

`ActivatedJobResult` when `withLease === true`: `leaseToken` is present (required, non-null).

## Type Declaration

### leaseToken

```ts
leaseToken: NonNullable<ActivatedJobResult["leaseToken"]>;
```
