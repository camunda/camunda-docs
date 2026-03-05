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

Defined in: [gen/CamundaClient.ts:698](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L698)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchCorrelatedMessageSubscriptions>>;
```

Defined in: [gen/CamundaClient.ts:700](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L700)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
