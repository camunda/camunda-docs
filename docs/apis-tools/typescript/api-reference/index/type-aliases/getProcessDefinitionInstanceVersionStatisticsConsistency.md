---
title: "Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceVersionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency

```ts
type getProcessDefinitionInstanceVersionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:427](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L427)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionInstanceVersionStatistics>>;
```

Defined in: [gen/CamundaClient.ts:429](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L429)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
