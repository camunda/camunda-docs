---
title: "Type Alias: searchDecisionInstancesConsistency"
sidebar_label: "searchDecisionInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionInstancesConsistency

```ts
type searchDecisionInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:714](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L714)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionInstances>>;
```

Defined in: [gen/CamundaClient.ts:716](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L716)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
