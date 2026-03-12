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

Defined in: [gen/CamundaClient.ts:661](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L661)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperationItems>>;
```

Defined in: [gen/CamundaClient.ts:663](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L663)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
