---
title: "Type Alias: searchDecisionDefinitionsConsistency"
sidebar_label: "searchDecisionDefinitionsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionDefinitionsConsistency

```ts
type searchDecisionDefinitionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:706](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L706)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionDefinitions>>;
```

Defined in: [gen/CamundaClient.ts:708](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L708)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
