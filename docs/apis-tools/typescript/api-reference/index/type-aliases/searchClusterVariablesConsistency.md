---
title: "Type Alias: searchClusterVariablesConsistency"
sidebar_label: "searchClusterVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchClusterVariablesConsistency

```ts
type searchClusterVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:690](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L690)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClusterVariables>>;
```

Defined in: [gen/CamundaClient.ts:692](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L692)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
