---
title: "Type Alias: getProcessDefinitionConsistency"
sidebar_label: "getProcessDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionConsistency

```ts
type getProcessDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:411](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L411)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinition>>;
```

Defined in: [gen/CamundaClient.ts:413](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L413)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
