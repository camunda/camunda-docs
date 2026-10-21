---
title: "Type Alias: SecretResolveResult"
sidebar_label: "SecretResolveResult"
mdx:
  format: md
---

# Type Alias: SecretResolveResult

```ts
type SecretResolveResult = object;
```

The per-reference outcome of a resolve request.

## Properties

### errors

```ts
errors: SecretResolutionError[];
```

The references that could not be resolved, each with a typed error code.

---

### resolved

```ts
resolved: ResolvedSecret[];
```

The references that were successfully resolved.
