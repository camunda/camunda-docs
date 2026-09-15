---
title: "Type Alias: GetDocumentErrors"
sidebar_label: "GetDocumentErrors"
mdx:
  format: md
---

# Type Alias: GetDocumentErrors

```ts
type GetDocumentErrors = object;
```

## Properties

### 404

```ts
404: ProblemDetail;
```

The document with the given ID was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
