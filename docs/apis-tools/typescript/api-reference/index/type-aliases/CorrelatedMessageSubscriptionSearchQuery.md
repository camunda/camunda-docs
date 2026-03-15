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

Defined in: [gen/types.gen.ts:5551](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5551)

## Type Declaration

### filter?

```ts
optional filter: CorrelatedMessageSubscriptionFilter;
```

The correlated message subscriptions search filters.

### sort?

```ts
optional sort: CorrelatedMessageSubscriptionSearchQuerySortRequest[];
```

Sort field criteria.
