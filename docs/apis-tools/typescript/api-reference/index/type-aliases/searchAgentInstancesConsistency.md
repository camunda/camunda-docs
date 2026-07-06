---
title: "Type Alias: searchAgentInstancesConsistency"
sidebar_label: "searchAgentInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchAgentInstancesConsistency

```ts
type searchAgentInstancesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAgentInstances>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
