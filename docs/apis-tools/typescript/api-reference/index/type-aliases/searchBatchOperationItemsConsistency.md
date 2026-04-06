---
title: "Type Alias: searchBatchOperationItemsConsistency"
sidebar_label: "searchBatchOperationItemsConsistency"
mdx:
  format: md
---

# Type Alias: searchBatchOperationItemsConsistency

```ts
type searchBatchOperationItemsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:660](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L660)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperationItems>>;
```

Defined in: [gen/CamundaClient.ts:662](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L662)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
