---
title: "Type Alias: DeleteDocumentErrors"
sidebar_label: "DeleteDocumentErrors"
mdx:
  format: md
---

# Type Alias: DeleteDocumentErrors

```ts
type DeleteDocumentErrors = object;
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
