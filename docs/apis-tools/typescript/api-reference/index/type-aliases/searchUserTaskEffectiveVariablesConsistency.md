---
title: "Type Alias: searchUserTaskEffectiveVariablesConsistency"
sidebar_label: "searchUserTaskEffectiveVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskEffectiveVariablesConsistency

```ts
type searchUserTaskEffectiveVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:959](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L959)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchUserTaskEffectiveVariables>
>;
```

Defined in: [gen/CamundaClient.ts:961](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L961)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
