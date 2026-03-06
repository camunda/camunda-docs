---
title: "Type Alias: searchRolesForTenantConsistency"
sidebar_label: "searchRolesForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForTenantConsistency

```ts
type searchRolesForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:883](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L883)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForTenant>>;
```

Defined in: [gen/CamundaClient.ts:885](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L885)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
