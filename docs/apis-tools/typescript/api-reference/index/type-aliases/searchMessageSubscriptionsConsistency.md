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

Defined in: [gen/CamundaClient.ts:832](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L832)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMessageSubscriptions>>;
```

Defined in: [gen/CamundaClient.ts:834](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L834)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
