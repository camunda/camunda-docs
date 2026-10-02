---
title: "Type Alias: getProcessInstanceStatisticsConsistency"
sidebar_label: "getProcessInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsConsistency

```ts
type getProcessInstanceStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatistics>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
