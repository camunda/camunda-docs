---
title: "Type Alias: getProcessInstanceWaitStateStatisticsConsistency"
sidebar_label: "getProcessInstanceWaitStateStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceWaitStateStatisticsConsistency

```ts
type getProcessInstanceWaitStateStatisticsConsistency = object;
```

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceWaitStateStatistics>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
