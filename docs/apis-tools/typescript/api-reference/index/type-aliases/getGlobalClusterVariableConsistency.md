---
title: "Type Alias: getGlobalClusterVariableConsistency"
sidebar_label: "getGlobalClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalClusterVariableConsistency

```ts
type getGlobalClusterVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:335](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L335)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalClusterVariable>>;
```

Defined in: [gen/CamundaClient.ts:337](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L337)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
