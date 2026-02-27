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

Defined in: [gen/types.gen.ts:4899](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4899)

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
