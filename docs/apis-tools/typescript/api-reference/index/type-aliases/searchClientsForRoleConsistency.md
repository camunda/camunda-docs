---
title: "Type Alias: searchClientsForRoleConsistency"
sidebar_label: "searchClientsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForRoleConsistency

```ts
type searchClientsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:686](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L686)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForRole>>;
```

Defined in: [gen/CamundaClient.ts:688](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L688)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
