---
title: "Type Alias: searchProcessInstancesConsistency"
sidebar_label: "searchProcessInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstancesConsistency

```ts
type searchProcessInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:857](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L857)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessInstances>>;
```

Defined in: [gen/CamundaClient.ts:859](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L859)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
