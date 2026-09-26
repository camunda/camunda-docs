---
title: "Type Alias: getUsageMetricsConsistency"
sidebar_label: "getUsageMetricsConsistency"
mdx:
  format: md
---

# Type Alias: getUsageMetricsConsistency

```ts
type getUsageMetricsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUsageMetrics>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
