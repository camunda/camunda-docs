---
title: "Type Alias: getProcessInstanceCallHierarchyConsistency"
sidebar_label: "getProcessInstanceCallHierarchyConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceCallHierarchyConsistency

```ts
type getProcessInstanceCallHierarchyConsistency = object;
```

Defined in: [gen/CamundaClient.ts:468](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L468)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstanceCallHierarchy>>;
```

Defined in: [gen/CamundaClient.ts:470](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L470)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
