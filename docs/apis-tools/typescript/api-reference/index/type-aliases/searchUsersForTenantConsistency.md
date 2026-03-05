---
title: "Type Alias: searchUsersForTenantConsistency"
sidebar_label: "searchUsersForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForTenantConsistency

```ts
type searchUsersForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:926](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L926)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForTenant>>;
```

Defined in: [gen/CamundaClient.ts:928](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L928)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
