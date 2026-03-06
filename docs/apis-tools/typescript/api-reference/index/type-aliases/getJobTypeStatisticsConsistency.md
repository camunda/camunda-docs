---
title: "Type Alias: getJobTypeStatisticsConsistency"
sidebar_label: "getJobTypeStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobTypeStatisticsConsistency

```ts
type getJobTypeStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:385](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L385)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTypeStatistics>>;
```

Defined in: [gen/CamundaClient.ts:387](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L387)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
