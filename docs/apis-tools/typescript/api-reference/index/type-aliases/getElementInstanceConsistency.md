---
title: "Type Alias: getElementInstanceConsistency"
sidebar_label: "getElementInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getElementInstanceConsistency

```ts
type getElementInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:331](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L331)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getElementInstance>>;
```

Defined in: [gen/CamundaClient.ts:333](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L333)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
