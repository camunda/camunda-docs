---
title: "Type Alias: searchGroupsConsistency"
sidebar_label: "searchGroupsConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsConsistency

```ts
type searchGroupsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:778](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L778)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroups>>;
```

Defined in: [gen/CamundaClient.ts:780](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L780)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
