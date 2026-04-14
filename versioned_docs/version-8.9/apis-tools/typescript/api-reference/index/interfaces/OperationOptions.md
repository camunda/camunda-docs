---
title: "Interface: OperationOptions"
sidebar_label: "OperationOptions"
mdx:
  format: md
---

# Interface: OperationOptions

Per-call options for individual SDK method invocations.

## Properties

### retry?

```ts
optional retry?: false | Partial<HttpRetryPolicy>;
```

Override retry behaviour for this call.

- Pass `false` to disable retry entirely (single attempt).
- Pass a partial policy to override specific fields (merged with global config).
