---
title: "Type Alias: getProcessDefinitionStatisticsConsistency"
sidebar_label: "getProcessDefinitionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionStatisticsConsistency

```ts
type getProcessDefinitionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:444](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L444)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionStatistics>>;
```

Defined in: [gen/CamundaClient.ts:446](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L446)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
