---
title: "Type Alias: getUserTaskConsistency"
sidebar_label: "getUserTaskConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskConsistency

```ts
type getUserTaskConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTask>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
