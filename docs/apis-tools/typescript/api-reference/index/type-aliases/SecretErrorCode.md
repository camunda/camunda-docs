---
title: "Type Alias: SecretErrorCode"
sidebar_label: "SecretErrorCode"
mdx:
  format: md
---

# Type Alias: SecretErrorCode

```ts
type SecretErrorCode =
  "NOT_FOUND" | "ACCESS_DENIED" | "INVALID_REFERENCE" | "UNREADABLE";
```

The typed reason a reference could not be resolved.

- `NOT_FOUND`: no secret exists for the reference.
- `ACCESS_DENIED`: the caller lacks `SECRET:REVEAL` on the reference.
- `INVALID_REFERENCE`: the reference is malformed, or the configured store rejected it as
  an invalid secret identifier.
- `UNREADABLE`: the configured store could not return a value for the reference, for
  example because it rejected the cluster's own store credentials or the stored value could
  not be read. Whether the secret exists is not implied.
