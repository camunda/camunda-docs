---
title: "Type Alias: getBatchOperationConsistency"
sidebar_label: "getBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: getBatchOperationConsistency

```ts
type getBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:313](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L313)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getBatchOperation>>;
```

Defined in: [gen/CamundaClient.ts:315](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L315)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
