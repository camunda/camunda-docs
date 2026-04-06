---
title: "Type Alias: getDecisionInstanceConsistency"
sidebar_label: "getDecisionInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionInstanceConsistency

```ts
type getDecisionInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:302](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L302)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionInstance>>;
```

Defined in: [gen/CamundaClient.ts:304](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L304)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
