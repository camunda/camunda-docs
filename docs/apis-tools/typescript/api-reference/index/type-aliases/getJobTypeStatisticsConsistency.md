---
title: "Type Alias: getJobTypeStatisticsConsistency"
sidebar_label: "getJobTypeStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobTypeStatisticsConsistency

```ts
type getJobTypeStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:397](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L397)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTypeStatistics>>;
```

Defined in: [gen/CamundaClient.ts:399](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L399)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
