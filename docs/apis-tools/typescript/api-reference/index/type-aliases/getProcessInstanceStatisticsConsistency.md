---
title: "Type Alias: getProcessInstanceStatisticsConsistency"
sidebar_label: "getProcessInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsConsistency

```ts
type getProcessInstanceStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:496](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L496)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:498](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L498)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
