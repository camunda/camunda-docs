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

Unbounded for now: Phase 1's backend is mocked with at most 3 references. Pagination is
expected to land here before GA, once a real secret store can return a tenant's full
enumeration in one response. This is an alpha endpoint, so that is not yet a
breaking-contract concern.

## Properties

### references

```ts
references: string[];
```

The secret references, each of the form `camunda.secrets.<name>`.
