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

Defined in: [gen/CamundaClient.ts:646](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L646)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperationItems>>;
```

Defined in: [gen/CamundaClient.ts:648](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L648)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
