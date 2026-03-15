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

Defined in: [gen/CamundaClient.ts:898](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L898)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForTenant>>;
```

Defined in: [gen/CamundaClient.ts:900](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L900)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
