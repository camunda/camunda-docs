---
title: "Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency"
sidebar_label: "getProcessDefinitionMessageSubscriptionStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionMessageSubscriptionStatisticsConsistency

```ts
type getProcessDefinitionMessageSubscriptionStatisticsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:447](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L447)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessDefinitionMessageSubscriptionStatistics>
>;
```

Defined in: [gen/CamundaClient.ts:449](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L449)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
