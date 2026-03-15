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

Defined in: [gen/CamundaClient.ts:669](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L669)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperations>>;
```

Defined in: [gen/CamundaClient.ts:671](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L671)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
