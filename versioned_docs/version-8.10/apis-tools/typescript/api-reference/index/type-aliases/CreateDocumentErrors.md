---
title: "Type Alias: CreateDocumentErrors"
sidebar_label: "CreateDocumentErrors"
mdx:
  format: md
---

# Type Alias: CreateDocumentErrors

```ts
type CreateDocumentErrors = object;
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
