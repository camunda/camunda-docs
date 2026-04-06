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

Defined in: [gen/CamundaClient.ts:695](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L695)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForTenant>>;
```

Defined in: [gen/CamundaClient.ts:697](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L697)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
