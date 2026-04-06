---
title: "Type Alias: getProcessDefinitionStatisticsConsistency"
sidebar_label: "getProcessDefinitionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionStatisticsConsistency

```ts
type getProcessDefinitionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:456](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L456)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:458](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L458)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
