---
title: "Type Alias: deleteProcessInstancesBatchOperationConsistency"
sidebar_label: "deleteProcessInstancesBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: deleteProcessInstancesBatchOperationConsistency

```ts
type deleteProcessInstancesBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:252](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L252)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.deleteProcessInstancesBatchOperation>
>;
```

Defined in: [gen/CamundaClient.ts:254](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L254)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
