---
title: "Type Alias: searchUserTasksConsistency"
sidebar_label: "searchUserTasksConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTasksConsistency

```ts
type searchUserTasksConsistency = object;
```

Defined in: [gen/CamundaClient.ts:943](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L943)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTasks>>;
```

Defined in: [gen/CamundaClient.ts:945](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L945)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
