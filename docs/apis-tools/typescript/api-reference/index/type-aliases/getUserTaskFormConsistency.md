---
title: "Type Alias: getUserTaskFormConsistency"
sidebar_label: "getUserTaskFormConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskFormConsistency

```ts
type getUserTaskFormConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTaskForm>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
