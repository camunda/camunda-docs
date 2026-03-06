---
title: "Type Alias: searchProcessInstanceIncidentsConsistency"
sidebar_label: "searchProcessInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstanceIncidentsConsistency

```ts
type searchProcessInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:849](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L849)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessInstanceIncidents>>;
```

Defined in: [gen/CamundaClient.ts:851](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L851)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
