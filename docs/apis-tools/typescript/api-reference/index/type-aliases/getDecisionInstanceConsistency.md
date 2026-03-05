---
title: "Type Alias: getDecisionInstanceConsistency"
sidebar_label: "getDecisionInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionInstanceConsistency

```ts
type getDecisionInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:298](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L298)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionInstance>>;
```

Defined in: [gen/CamundaClient.ts:300](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L300)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
