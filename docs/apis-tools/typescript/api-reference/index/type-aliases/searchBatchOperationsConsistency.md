---
title: "Type Alias: searchBatchOperationsConsistency"
sidebar_label: "searchBatchOperationsConsistency"
mdx:
  format: md
---

# Type Alias: searchBatchOperationsConsistency

```ts
type searchBatchOperationsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:668](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L668)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperations>>;
```

Defined in: [gen/CamundaClient.ts:670](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L670)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
