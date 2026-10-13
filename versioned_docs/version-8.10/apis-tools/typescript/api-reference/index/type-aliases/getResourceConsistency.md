---
title: "Type Alias: getResourceConsistency"
sidebar_label: "getResourceConsistency"
mdx:
  format: md
---

# Type Alias: getResourceConsistency

```ts
type getResourceConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getResource>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
