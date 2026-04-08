---
title: "Type Alias: getDecisionRequirementsConsistency"
sidebar_label: "getDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsConsistency

```ts
type getDecisionRequirementsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:310](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L310)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirements>>;
```

Defined in: [gen/CamundaClient.ts:312](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L312)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
