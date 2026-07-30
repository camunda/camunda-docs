---
title: "Type Alias: SecretErrorCode"
sidebar_label: "SecretErrorCode"
mdx:
  format: md
---

# Type Alias: SecretErrorCode

```ts
type SecretErrorCode = "NOT_FOUND" | "ACCESS_DENIED" | "INVALID_REFERENCE";
```

The typed reason a reference could not be resolved.

- `NOT_FOUND`: no secret exists for the reference.
- `ACCESS_DENIED`: the caller lacks `SECRET:REVEAL` on the reference.
- `INVALID_REFERENCE`: the reference is malformed.
