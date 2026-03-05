---
title: "Type Alias: resumeBatchOperationConsistency"
sidebar_label: "resumeBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: resumeBatchOperationConsistency

```ts
type resumeBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:654](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L654)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.resumeBatchOperation>>;
```

Defined in: [gen/CamundaClient.ts:656](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L656)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
