---
title: "Type Alias: deleteDecisionInstancesBatchOperationConsistency"
sidebar_label: "deleteDecisionInstancesBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: deleteDecisionInstancesBatchOperationConsistency

```ts
type deleteDecisionInstancesBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:222](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L222)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.deleteDecisionInstancesBatchOperation>
>;
```

Defined in: [gen/CamundaClient.ts:224](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L224)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
