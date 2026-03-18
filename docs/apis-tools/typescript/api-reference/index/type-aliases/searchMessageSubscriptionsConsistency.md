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

Defined in: [gen/CamundaClient.ts:856](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L856)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMessageSubscriptions>>;
```

Defined in: [gen/CamundaClient.ts:858](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L858)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
