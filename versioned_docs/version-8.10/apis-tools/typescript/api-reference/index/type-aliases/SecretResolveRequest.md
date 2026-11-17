---
title: "Type Alias: SecretResolveRequest"
sidebar_label: "SecretResolveRequest"
mdx:
  format: md
---

# Type Alias: SecretResolveRequest

```ts
type SecretResolveRequest = object;
```

## Properties

### references

```ts
references: string[];
```

The secret references to resolve, each of the form `camunda.secrets.<name>`.
Duplicate references are deduplicated by the server and resolved once.
At most 20 references may be requested in a single batch.
