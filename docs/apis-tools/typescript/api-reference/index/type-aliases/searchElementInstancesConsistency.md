---
title: "Type Alias: searchElementInstancesConsistency"
sidebar_label: "searchElementInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstancesConsistency

```ts
type searchElementInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:739](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L739)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchElementInstances>>;
```

Defined in: [gen/CamundaClient.ts:741](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L741)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
