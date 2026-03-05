---
title: "Type Alias: searchTenantsConsistency"
sidebar_label: "searchTenantsConsistency"
mdx:
  format: md
---

# Type Alias: searchTenantsConsistency

```ts
type searchTenantsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:891](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L891)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchTenants>>;
```

Defined in: [gen/CamundaClient.ts:893](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L893)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
