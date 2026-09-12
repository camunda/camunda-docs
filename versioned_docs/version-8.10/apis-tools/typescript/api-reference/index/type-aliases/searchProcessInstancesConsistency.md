---
title: "Type Alias: searchProcessInstancesConsistency"
sidebar_label: "searchProcessInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstancesConsistency

```ts
type searchProcessInstancesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessInstances>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
