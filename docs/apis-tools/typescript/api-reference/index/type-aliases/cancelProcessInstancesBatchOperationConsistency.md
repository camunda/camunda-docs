---
title: "Type Alias: cancelProcessInstancesBatchOperationConsistency"
sidebar_label: "cancelProcessInstancesBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: cancelProcessInstancesBatchOperationConsistency

```ts
type cancelProcessInstancesBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:128](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L128)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.cancelProcessInstancesBatchOperation>
>;
```

Defined in: [gen/CamundaClient.ts:130](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L130)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
