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

Defined in: [gen/CamundaClient.ts:686](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L686)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperations>>;
```

Defined in: [gen/CamundaClient.ts:688](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L688)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
