---
title: "Type Alias: getTenantConsistency"
sidebar_label: "getTenantConsistency"
mdx:
  format: md
---

# Type Alias: getTenantConsistency

```ts
type getTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:532](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L532)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getTenant>>;
```

Defined in: [gen/CamundaClient.ts:534](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L534)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
