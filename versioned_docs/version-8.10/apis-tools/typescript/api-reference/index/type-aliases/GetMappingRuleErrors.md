---
title: "Type Alias: GetMappingRuleErrors"
sidebar_label: "GetMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: GetMappingRuleErrors

```ts
type GetMappingRuleErrors = object;
```

## Properties

### 401

```ts
401: ProblemDetail;
```

The request lacks valid authentication credentials.

---

### 404

```ts
404: ProblemDetail;
```

The mapping rule with the mappingRuleId was not found.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.
