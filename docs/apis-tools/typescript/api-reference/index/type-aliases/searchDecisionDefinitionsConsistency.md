---
title: "Type Alias: searchDecisionDefinitionsConsistency"
sidebar_label: "searchDecisionDefinitionsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionDefinitionsConsistency

```ts
type searchDecisionDefinitionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:720](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L720)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionDefinitions>>;
```

Defined in: [gen/CamundaClient.ts:722](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L722)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
