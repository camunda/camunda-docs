---
title: "Type Alias: getResourceContentConsistency"
sidebar_label: "getResourceContentConsistency"
mdx:
  format: md
---

# Type Alias: getResourceContentConsistency

```ts
type getResourceContentConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getResourceContent>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
