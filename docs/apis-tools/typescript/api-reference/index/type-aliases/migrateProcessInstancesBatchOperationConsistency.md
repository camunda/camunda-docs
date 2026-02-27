---
title: "Type Alias: migrateProcessInstancesBatchOperationConsistency"
sidebar_label: "migrateProcessInstancesBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: migrateProcessInstancesBatchOperationConsistency

```ts
type migrateProcessInstancesBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:605](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L605)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.migrateProcessInstancesBatchOperation>
>;
```

Defined in: [gen/CamundaClient.ts:607](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L607)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
