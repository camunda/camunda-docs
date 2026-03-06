---
title: "Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency"
sidebar_label: "getProcessDefinitionMessageSubscriptionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency

```ts
type getProcessDefinitionMessageSubscriptionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:435](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L435)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionMessageSubscriptionStatistics>>;
```

Defined in: [gen/CamundaClient.ts:437](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L437)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
