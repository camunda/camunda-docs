---
title: "Type Alias: getTenantClusterVariableConsistency"
sidebar_label: "getTenantClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getTenantClusterVariableConsistency

```ts
type getTenantClusterVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:541](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L541)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getTenantClusterVariable>>;
```

Defined in: [gen/CamundaClient.ts:543](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L543)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
