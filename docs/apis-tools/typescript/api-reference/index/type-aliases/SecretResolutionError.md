---
title: "Type Alias: SecretResolutionError"
sidebar_label: "SecretResolutionError"
mdx:
  format: md
---

# Type Alias: SecretResolutionError

```ts
type SecretResolutionError = object;
```

## Properties

### code

```ts
code: SecretErrorCode;
```

---

### message

```ts
message: string;
```

A human-readable description of the failure. Never contains the secret value;
only error metadata (codes, names) is included.

---

### reference

```ts
reference: string;
```

The secret reference that could not be resolved.
