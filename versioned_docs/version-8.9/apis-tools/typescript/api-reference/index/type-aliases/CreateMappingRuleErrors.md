---
title: "Type Alias: CreateMappingRuleErrors"
sidebar_label: "CreateMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: CreateMappingRuleErrors

```ts
type CreateMappingRuleErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

The request to create a mapping rule was denied.
More details are provided in the response body.

---

### 404

```ts
404: ProblemDetail;
```

The request to create a mapping rule was denied.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
