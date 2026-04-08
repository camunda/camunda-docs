---
title: "Type Alias: searchRolesForGroupConsistency"
sidebar_label: "searchRolesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForGroupConsistency

```ts
type searchRolesForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:888](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L888)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:890](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L890)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
