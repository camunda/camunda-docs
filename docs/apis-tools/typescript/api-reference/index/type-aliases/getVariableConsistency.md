---
title: "Type Alias: getVariableConsistency"
sidebar_label: "getVariableConsistency"
mdx:
  format: md
---

# Type Alias: getVariableConsistency

```ts
type getVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:600](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L600)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getVariable>>;
```

Defined in: [gen/CamundaClient.ts:602](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L602)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
