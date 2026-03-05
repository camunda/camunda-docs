---
title: "Type Alias: getGlobalTaskListenerConsistency"
sidebar_label: "getGlobalTaskListenerConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalTaskListenerConsistency

```ts
type getGlobalTaskListenerConsistency = object;
```

Defined in: [gen/CamundaClient.ts:353](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L353)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalTaskListener>>;
```

Defined in: [gen/CamundaClient.ts:355](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L355)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
