---
title: "Type Alias: getAgentInstanceConsistency"
sidebar_label: "getAgentInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getAgentInstanceConsistency

```ts
type getAgentInstanceConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAgentInstance>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
