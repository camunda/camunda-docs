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

Defined in: [gen/CamundaClient.ts:897](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L897)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForTenant>>;
```

Defined in: [gen/CamundaClient.ts:899](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L899)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
