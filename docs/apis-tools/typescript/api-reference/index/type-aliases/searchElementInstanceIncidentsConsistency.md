---
title: "Type Alias: searchElementInstanceIncidentsConsistency"
sidebar_label: "searchElementInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstanceIncidentsConsistency

```ts
type searchElementInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:731](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L731)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchElementInstanceIncidents>>;
```

Defined in: [gen/CamundaClient.ts:733](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L733)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
