---
title: "Type Alias: getGlobalClusterVariableConsistency"
sidebar_label: "getGlobalClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalClusterVariableConsistency

```ts
type getGlobalClusterVariableConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalClusterVariable>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
