---
title: "Type Alias: searchJobsConsistency"
sidebar_label: "searchJobsConsistency"
mdx:
  format: md
---

# Type Alias: searchJobsConsistency

```ts
type searchJobsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchJobs>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
