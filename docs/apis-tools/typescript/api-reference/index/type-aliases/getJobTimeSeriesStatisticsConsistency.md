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

Defined in: [gen/CamundaClient.ts:377](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L377)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTimeSeriesStatistics>>;
```

Defined in: [gen/CamundaClient.ts:379](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L379)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
