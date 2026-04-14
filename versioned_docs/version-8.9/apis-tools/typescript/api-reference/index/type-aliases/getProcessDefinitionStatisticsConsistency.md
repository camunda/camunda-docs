---
title: "Type Alias: getProcessDefinitionStatisticsConsistency"
sidebar_label: "getProcessDefinitionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionStatisticsConsistency

```ts
type getProcessDefinitionStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionStatistics>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
