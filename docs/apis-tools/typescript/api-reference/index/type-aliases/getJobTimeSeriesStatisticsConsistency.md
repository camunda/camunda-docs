---
title: "Type Alias: getJobTimeSeriesStatisticsConsistency"
sidebar_label: "getJobTimeSeriesStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobTimeSeriesStatisticsConsistency

```ts
type getJobTimeSeriesStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:390](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L390)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTimeSeriesStatistics>>;
```

Defined in: [gen/CamundaClient.ts:392](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L392)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
