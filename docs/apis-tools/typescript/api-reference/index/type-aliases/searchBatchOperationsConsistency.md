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

Defined in: [gen/CamundaClient.ts:654](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L654)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchBatchOperations>>;
```

Defined in: [gen/CamundaClient.ts:656](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L656)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
