---
title: "Type Alias: GetResourceErrors"
sidebar_label: "GetResourceErrors"
mdx:
  format: md
---

# Type Alias: GetResourceErrors

```ts
type GetResourceErrors = object;
```

## Properties

### 404

```ts
404: ProblemDetail;
```

A resource with the given key was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
