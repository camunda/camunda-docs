---
title: "Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency"
sidebar_label: "getProcessDefinitionMessageSubscriptionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency

```ts
type getProcessDefinitionMessageSubscriptionStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionMessageSubscriptionStatistics>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
