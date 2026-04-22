---
title: "Type Alias: CreateDocumentsErrors"
sidebar_label: "CreateDocumentsErrors"
mdx:
  format: md
---

# Type Alias: CreateDocumentsErrors

```ts
type CreateDocumentsErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

---

### 415

```ts
415: ProblemDetail;
```

The server cannot process the request because the media type (Content-Type) of the request payload is not supported
by the server for the requested resource and method.
