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

Defined in: [gen/CamundaClient.ts:770](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L770)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupIdsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:772](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L772)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
