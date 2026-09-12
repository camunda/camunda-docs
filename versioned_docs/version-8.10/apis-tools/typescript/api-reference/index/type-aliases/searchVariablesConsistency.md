---
title: "Type Alias: searchVariablesConsistency"
sidebar_label: "searchVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchVariablesConsistency

```ts
type searchVariablesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchVariables>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
