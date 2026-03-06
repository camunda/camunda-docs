---
title: "Type Alias: getProcessInstanceConsistency"
sidebar_label: "getProcessInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceConsistency

```ts
type getProcessInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:460](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L460)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstance>>;
```

Defined in: [gen/CamundaClient.ts:462](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L462)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
