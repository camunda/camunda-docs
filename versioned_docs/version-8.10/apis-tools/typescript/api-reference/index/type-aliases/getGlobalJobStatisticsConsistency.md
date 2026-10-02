---
title: "Type Alias: getGlobalJobStatisticsConsistency"
sidebar_label: "getGlobalJobStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalJobStatisticsConsistency

```ts
type getGlobalJobStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalJobStatistics>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
