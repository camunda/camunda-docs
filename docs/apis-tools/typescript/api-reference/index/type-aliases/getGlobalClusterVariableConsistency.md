---
title: "Type Alias: getGlobalClusterVariableConsistency"
sidebar_label: "getGlobalClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalClusterVariableConsistency

```ts
type getGlobalClusterVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:339](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L339)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalClusterVariable>>;
```

Defined in: [gen/CamundaClient.ts:341](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L341)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
