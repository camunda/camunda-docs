---
title: "Type Alias: getElementInstanceConsistency"
sidebar_label: "getElementInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getElementInstanceConsistency

```ts
type getElementInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:327](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L327)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getElementInstance>>;
```

Defined in: [gen/CamundaClient.ts:329](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L329)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
