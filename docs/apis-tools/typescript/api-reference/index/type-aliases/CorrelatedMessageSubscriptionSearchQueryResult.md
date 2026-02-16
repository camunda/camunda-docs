---
title: "Type Alias: CorrelatedMessageSubscriptionSearchQueryResult"
sidebar_label: "CorrelatedMessageSubscriptionSearchQueryResult"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionSearchQueryResult

```ts
type CorrelatedMessageSubscriptionSearchQueryResult = SearchQueryResponse &
  object;
```

Defined in: [gen/types.gen.ts:4840](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4840)

## Type Declaration

### items?

```ts
optional items: CorrelatedMessageSubscriptionResult[];
```

The matching correlated message subscriptions.
