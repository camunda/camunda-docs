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

Defined in: [gen/types.gen.ts:5487](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5487)

## Type Declaration

### items

```ts
items: CorrelatedMessageSubscriptionResult[];
```

The matching correlated message subscriptions.
