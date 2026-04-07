---
title: "Type Alias: getJobWorkerStatisticsConsistency"
sidebar_label: "getJobWorkerStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobWorkerStatisticsConsistency

```ts
type getJobWorkerStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:405](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L405)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobWorkerStatistics>>;
```

Defined in: [gen/CamundaClient.ts:407](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L407)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
