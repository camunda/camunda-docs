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

Defined in: [gen/CamundaClient.ts:941](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L941)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForTenant>>;
```

Defined in: [gen/CamundaClient.ts:943](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L943)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
