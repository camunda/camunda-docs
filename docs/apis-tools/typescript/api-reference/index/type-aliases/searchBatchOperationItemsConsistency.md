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

Defined in: [gen/CamundaClient.ts:678](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L678)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperationItems>>;
```

Defined in: [gen/CamundaClient.ts:680](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L680)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
