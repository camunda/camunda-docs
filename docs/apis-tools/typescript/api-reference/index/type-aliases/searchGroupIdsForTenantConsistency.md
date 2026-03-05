---
title: "Type Alias: searchGroupIdsForTenantConsistency"
sidebar_label: "searchGroupIdsForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupIdsForTenantConsistency

```ts
type searchGroupIdsForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:756](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L756)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupIdsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:758](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L758)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
