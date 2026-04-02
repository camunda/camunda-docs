---
title: "Type Alias: CorrelatedMessageSubscriptionSearchQuery"
sidebar_label: "CorrelatedMessageSubscriptionSearchQuery"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionSearchQuery

```ts
type CorrelatedMessageSubscriptionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5554](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5554)

## Type Declaration

### filter?

```ts
optional filter?: CorrelatedMessageSubscriptionFilter;
```

The correlated message subscriptions search filters.

### sort?

```ts
optional sort?: CorrelatedMessageSubscriptionSearchQuerySortRequest[];
```

Sort field criteria.
