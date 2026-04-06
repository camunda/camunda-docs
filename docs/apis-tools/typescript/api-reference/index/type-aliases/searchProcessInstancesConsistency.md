---
title: "Type Alias: searchProcessInstancesConsistency"
sidebar_label: "searchProcessInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstancesConsistency

```ts
type searchProcessInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:871](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L871)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessInstances>>;
```

Defined in: [gen/CamundaClient.ts:873](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L873)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
