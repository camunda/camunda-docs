---
title: "Type Alias: getGlobalJobStatisticsConsistency"
sidebar_label: "getGlobalJobStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalJobStatisticsConsistency

```ts
type getGlobalJobStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:345](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L345)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalJobStatistics>>;
```

Defined in: [gen/CamundaClient.ts:347](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L347)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
