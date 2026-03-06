---
title: "Type Alias: getDecisionDefinitionConsistency"
sidebar_label: "getDecisionDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionConsistency

```ts
type getDecisionDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:282](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L282)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinition>>;
```

Defined in: [gen/CamundaClient.ts:284](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L284)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
