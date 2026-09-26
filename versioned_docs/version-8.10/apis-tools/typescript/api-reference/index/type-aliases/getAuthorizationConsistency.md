---
title: "Type Alias: getAuthorizationConsistency"
sidebar_label: "getAuthorizationConsistency"
mdx:
  format: md
---

# Type Alias: getAuthorizationConsistency

```ts
type getAuthorizationConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuthorization>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
