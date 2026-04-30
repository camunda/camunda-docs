---
title: "Type Alias: getProcessDefinitionInstanceStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceStatisticsConsistency

```ts
type getProcessDefinitionInstanceStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionInstanceStatistics>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
