---
title: "Type Alias: searchMessageSubscriptionsConsistency"
sidebar_label: "searchMessageSubscriptionsConsistency"
mdx:
  format: md
---

# Type Alias: searchMessageSubscriptionsConsistency

```ts
type searchMessageSubscriptionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:847](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L847)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMessageSubscriptions>>;
```

Defined in: [gen/CamundaClient.ts:849](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L849)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
