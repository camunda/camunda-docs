---
title: "Type Alias: searchClusterVariablesConsistency"
sidebar_label: "searchClusterVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchClusterVariablesConsistency

```ts
type searchClusterVariablesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClusterVariables>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
