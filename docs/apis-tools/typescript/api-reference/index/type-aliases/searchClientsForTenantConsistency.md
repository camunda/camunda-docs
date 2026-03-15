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

Defined in: [gen/CamundaClient.ts:696](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L696)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:698](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L698)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
