---
title: "Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency"
sidebar_label: "getProcessDefinitionInstanceVersionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionInstanceVersionStatisticsConsistency

```ts
type getProcessDefinitionInstanceVersionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:439](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L439)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionInstanceVersionStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:441](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L441)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
