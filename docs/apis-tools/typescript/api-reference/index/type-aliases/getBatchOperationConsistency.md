---
title: "Type Alias: getBatchOperationConsistency"
sidebar_label: "getBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: getBatchOperationConsistency

```ts
type getBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:278](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L278)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getBatchOperation>>;
```

Defined in: [gen/CamundaClient.ts:280](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L280)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
