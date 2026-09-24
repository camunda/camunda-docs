---
title: "Type Alias: SecretListResult"
sidebar_label: "SecretListResult"
mdx:
  format: md
---

# Type Alias: SecretListResult

```ts
type SecretListResult = object;
```

The secret references the caller is authorized to see.

Unbounded: the response carries the configured stores' full enumeration for the physical
tenant.

## Properties

### references

```ts
references: string[];
```

The secret references, each of the form `camunda.secrets.<name>`.
