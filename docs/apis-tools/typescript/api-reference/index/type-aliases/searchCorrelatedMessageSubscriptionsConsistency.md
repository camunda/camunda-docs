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

Defined in: [gen/CamundaClient.ts:730](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L730)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchCorrelatedMessageSubscriptions>
>;
```

Defined in: [gen/CamundaClient.ts:732](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L732)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
