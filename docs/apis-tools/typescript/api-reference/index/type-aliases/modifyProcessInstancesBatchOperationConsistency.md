---
title: "Type Alias: modifyProcessInstancesBatchOperationConsistency"
sidebar_label: "modifyProcessInstancesBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: modifyProcessInstancesBatchOperationConsistency

```ts
type modifyProcessInstancesBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:617](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L617)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.modifyProcessInstancesBatchOperation>
>;
```

Defined in: [gen/CamundaClient.ts:619](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L619)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
