---
title: "Type Alias: searchDecisionInstancesConsistency"
sidebar_label: "searchDecisionInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionInstancesConsistency

```ts
type searchDecisionInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:728](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L728)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionInstances>>;
```

Defined in: [gen/CamundaClient.ts:730](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L730)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
