---
title: "Type Alias: getIncidentConsistency"
sidebar_label: "getIncidentConsistency"
mdx:
  format: md
---

# Type Alias: getIncidentConsistency

```ts
type getIncidentConsistency = object;
```

Defined in: [gen/CamundaClient.ts:369](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L369)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getIncident>>;
```

Defined in: [gen/CamundaClient.ts:371](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L371)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
