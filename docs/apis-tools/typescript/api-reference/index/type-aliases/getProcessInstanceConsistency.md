---
title: "Type Alias: getProcessInstanceConsistency"
sidebar_label: "getProcessInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceConsistency

```ts
type getProcessInstanceConsistency = object;
```

Defined in: [gen/CamundaClient.ts:472](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L472)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstance>>;
```

Defined in: [gen/CamundaClient.ts:474](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L474)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
