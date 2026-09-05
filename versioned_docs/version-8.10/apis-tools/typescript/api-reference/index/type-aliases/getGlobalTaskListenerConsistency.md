---
title: "Type Alias: getGlobalTaskListenerConsistency"
sidebar_label: "getGlobalTaskListenerConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalTaskListenerConsistency

```ts
type getGlobalTaskListenerConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalTaskListener>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
