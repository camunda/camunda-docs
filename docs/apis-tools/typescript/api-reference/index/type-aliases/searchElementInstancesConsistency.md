---
title: "Type Alias: searchElementInstancesConsistency"
sidebar_label: "searchElementInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstancesConsistency

```ts
type searchElementInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:753](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L753)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchElementInstances>>;
```

Defined in: [gen/CamundaClient.ts:755](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L755)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
