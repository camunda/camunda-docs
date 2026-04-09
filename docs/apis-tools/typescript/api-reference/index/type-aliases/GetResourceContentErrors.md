---
title: "Type Alias: GetResourceContentErrors"
sidebar_label: "GetResourceContentErrors"
mdx:
  format: md
---

# Type Alias: GetResourceContentErrors

```ts
type GetResourceContentErrors = object;
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
