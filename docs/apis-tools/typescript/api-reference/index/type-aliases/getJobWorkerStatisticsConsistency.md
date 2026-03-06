---
title: "Type Alias: getJobWorkerStatisticsConsistency"
sidebar_label: "getJobWorkerStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobWorkerStatisticsConsistency

```ts
type getJobWorkerStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:393](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L393)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobWorkerStatistics>>;
```

Defined in: [gen/CamundaClient.ts:395](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L395)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
