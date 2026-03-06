---
title: "Type Alias: getVariableConsistency"
sidebar_label: "getVariableConsistency"
mdx:
  format: md
---

# Type Alias: getVariableConsistency

```ts
type getVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:586](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L586)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getVariable>>;
```

Defined in: [gen/CamundaClient.ts:588](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L588)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
