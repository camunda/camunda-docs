---
title: "Type Alias: getProcessDefinitionInstanceStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceStatisticsConsistency

```ts
type getProcessDefinitionInstanceStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:431](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L431)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionInstanceStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:433](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L433)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
