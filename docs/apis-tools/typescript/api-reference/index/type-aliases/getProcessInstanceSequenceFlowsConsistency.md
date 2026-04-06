---
title: "Type Alias: getProcessInstanceSequenceFlowsConsistency"
sidebar_label: "getProcessInstanceSequenceFlowsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceSequenceFlowsConsistency

```ts
type getProcessInstanceSequenceFlowsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:488](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L488)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceSequenceFlows>
>;
```

Defined in: [gen/CamundaClient.ts:490](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L490)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
