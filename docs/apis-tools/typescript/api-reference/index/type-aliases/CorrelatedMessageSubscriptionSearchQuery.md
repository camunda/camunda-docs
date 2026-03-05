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

Defined in: [gen/types.gen.ts:5481](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5481)

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
