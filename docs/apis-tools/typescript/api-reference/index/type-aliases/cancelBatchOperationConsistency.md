---
title: "Type Alias: cancelBatchOperationConsistency"
sidebar_label: "cancelBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: cancelBatchOperationConsistency

```ts
type cancelBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:116](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L116)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.cancelBatchOperation>>;
```

Defined in: [gen/CamundaClient.ts:118](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L118)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
