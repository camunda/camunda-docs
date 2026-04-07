---
title: "Type Alias: getUsageMetricsConsistency"
sidebar_label: "getUsageMetricsConsistency"
mdx:
  format: md
---

# Type Alias: getUsageMetricsConsistency

```ts
type getUsageMetricsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:568](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L568)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUsageMetrics>>;
```

Defined in: [gen/CamundaClient.ts:570](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L570)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
