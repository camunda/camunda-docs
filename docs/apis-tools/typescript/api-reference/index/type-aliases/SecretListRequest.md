---
title: "Type Alias: SecretListRequest"
sidebar_label: "SecretListRequest"
mdx:
  format: md
---

# Type Alias: SecretListRequest

```ts
type SecretListRequest = object;
```

Options for listing secrets. The request body is optional: omitting it, or sending an empty
object, lists every secret the caller may read.

## Properties

### filter?

```ts
filter?: SecretListFilter;
```

Narrows the listed secrets. Omit it to list secrets in every state. Clusters before 8.11
reject this property with `400`.
