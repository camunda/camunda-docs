---
title: "Type Alias: searchUserTasksConsistency"
sidebar_label: "searchUserTasksConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTasksConsistency

```ts
type searchUserTasksConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTasks>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
