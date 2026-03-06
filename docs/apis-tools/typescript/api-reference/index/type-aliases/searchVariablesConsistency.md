---
title: "Type Alias: searchVariablesConsistency"
sidebar_label: "searchVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchVariablesConsistency

```ts
type searchVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:962](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L962)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchVariables>>;
```

Defined in: [gen/CamundaClient.ts:964](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L964)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
