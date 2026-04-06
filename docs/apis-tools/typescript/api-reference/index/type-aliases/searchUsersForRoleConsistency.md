---
title: "Type Alias: searchUsersForRoleConsistency"
sidebar_label: "searchUsersForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForRoleConsistency

```ts
type searchUsersForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:931](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L931)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForRole>>;
```

Defined in: [gen/CamundaClient.ts:933](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L933)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
