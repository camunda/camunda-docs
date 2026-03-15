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

Defined in: [gen/CamundaClient.ts:279](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L279)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getBatchOperation>>;
```

Defined in: [gen/CamundaClient.ts:281](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L281)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
