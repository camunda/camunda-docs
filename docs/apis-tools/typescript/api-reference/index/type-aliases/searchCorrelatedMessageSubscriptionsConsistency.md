---
title: "Type Alias: searchCorrelatedMessageSubscriptionsConsistency"
sidebar_label: "searchCorrelatedMessageSubscriptionsConsistency"
mdx:
  format: md
---

# Type Alias: searchCorrelatedMessageSubscriptionsConsistency

```ts
type searchCorrelatedMessageSubscriptionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:713](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L713)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchCorrelatedMessageSubscriptions>>;
```

Defined in: [gen/CamundaClient.ts:715](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L715)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
