---
title: "Type Alias: searchUserTaskVariablesConsistency"
sidebar_label: "searchUserTaskVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskVariablesConsistency

```ts
type searchUserTaskVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:953](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L953)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskVariables>>;
```

Defined in: [gen/CamundaClient.ts:955](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L955)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
