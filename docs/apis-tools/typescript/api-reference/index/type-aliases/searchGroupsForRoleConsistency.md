---
title: "Type Alias: searchGroupsForRoleConsistency"
sidebar_label: "searchGroupsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsForRoleConsistency

```ts
type searchGroupsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:787](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L787)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupsForRole>>;
```

Defined in: [gen/CamundaClient.ts:789](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L789)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
