---
title: "Type Alias: searchAgentInstanceHistoryConsistency"
sidebar_label: "searchAgentInstanceHistoryConsistency"
mdx:
  format: md
---

# Type Alias: searchAgentInstanceHistoryConsistency

```ts
type searchAgentInstanceHistoryConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAgentInstanceHistory>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
