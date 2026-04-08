---
title: "Type Alias: getGlobalJobStatisticsConsistency"
sidebar_label: "getGlobalJobStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalJobStatisticsConsistency

```ts
type getGlobalJobStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:349](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L349)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalJobStatistics>>;
```

Defined in: [gen/CamundaClient.ts:351](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L351)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
