---
title: "Type Alias: ResolveSecretsResponses"
sidebar_label: "ResolveSecretsResponses"
mdx:
  format: md
---

# Type Alias: ResolveSecretsResponses

```ts
type ResolveSecretsResponses = object;
```

## Properties

### 200

```ts
200: SecretResolveResult;
```

The batch was processed. Per-reference outcomes are split between `resolved` and
`errors`; this status is returned even when some or all references failed.
