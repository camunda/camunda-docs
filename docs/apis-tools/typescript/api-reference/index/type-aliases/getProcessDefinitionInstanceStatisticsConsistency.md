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

Defined in: [gen/CamundaClient.ts:419](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L419)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionInstanceStatistics>>;
```

Defined in: [gen/CamundaClient.ts:421](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L421)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
