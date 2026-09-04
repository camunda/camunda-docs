---
title: "Type Alias: searchGlobalTaskListenersConsistency"
sidebar_label: "searchGlobalTaskListenersConsistency"
mdx:
  format: md
---

# Type Alias: searchGlobalTaskListenersConsistency

```ts
type searchGlobalTaskListenersConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGlobalTaskListeners>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
