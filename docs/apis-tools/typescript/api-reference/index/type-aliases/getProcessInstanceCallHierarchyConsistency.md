---
title: "Type Alias: getProcessInstanceCallHierarchyConsistency"
sidebar_label: "getProcessInstanceCallHierarchyConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceCallHierarchyConsistency

```ts
type getProcessInstanceCallHierarchyConsistency = object;
```

Defined in: [gen/CamundaClient.ts:480](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L480)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceCallHierarchy>
>;
```

Defined in: [gen/CamundaClient.ts:482](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L482)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
