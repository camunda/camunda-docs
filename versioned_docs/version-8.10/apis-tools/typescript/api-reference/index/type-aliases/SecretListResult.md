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

Unbounded for now: the response carries the configured stores' full enumeration for the
physical tenant. Pagination is expected to land here before GA. This is an alpha endpoint,
so that is not yet a breaking-contract concern.

## Properties

### references

```ts
references: string[];
```

The secret references, each of the form `camunda.secrets.<name>`.
