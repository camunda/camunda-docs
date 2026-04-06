---
title: "Type Alias: getUserTaskConsistency"
sidebar_label: "getUserTaskConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskConsistency

```ts
type getUserTaskConsistency = object;
```

Defined in: [gen/CamundaClient.ts:584](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L584)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTask>>;
```

Defined in: [gen/CamundaClient.ts:586](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L586)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
