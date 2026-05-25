---
title: "Type Alias: searchUserTaskVariablesConsistency"
sidebar_label: "searchUserTaskVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskVariablesConsistency

```ts
type searchUserTaskVariablesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskVariables>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
