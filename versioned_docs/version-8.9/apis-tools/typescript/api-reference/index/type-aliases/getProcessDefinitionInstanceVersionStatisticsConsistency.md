---
title: "Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceVersionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency

```ts
type getProcessDefinitionInstanceVersionStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionInstanceVersionStatistics>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
