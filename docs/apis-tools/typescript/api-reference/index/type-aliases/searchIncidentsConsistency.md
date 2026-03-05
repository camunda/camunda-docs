---
title: "Type Alias: searchIncidentsConsistency"
sidebar_label: "searchIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchIncidentsConsistency

```ts
type searchIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:781](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L781)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchIncidents>>;
```

Defined in: [gen/CamundaClient.ts:783](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L783)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
