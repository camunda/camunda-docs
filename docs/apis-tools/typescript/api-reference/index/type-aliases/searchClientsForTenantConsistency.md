---
title: "Type Alias: searchClientsForTenantConsistency"
sidebar_label: "searchClientsForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForTenantConsistency

```ts
type searchClientsForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:681](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L681)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:683](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L683)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
