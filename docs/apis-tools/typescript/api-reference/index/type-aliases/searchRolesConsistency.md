---
title: "Type Alias: searchRolesConsistency"
sidebar_label: "searchRolesConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesConsistency

```ts
type searchRolesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:879](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L879)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRoles>>;
```

Defined in: [gen/CamundaClient.ts:881](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L881)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
