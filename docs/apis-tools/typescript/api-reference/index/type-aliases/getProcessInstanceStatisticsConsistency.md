---
title: "Type Alias: getProcessInstanceStatisticsConsistency"
sidebar_label: "getProcessInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsConsistency

```ts
type getProcessInstanceStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:484](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L484)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstanceStatistics>>;
```

Defined in: [gen/CamundaClient.ts:486](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L486)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
