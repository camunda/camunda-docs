---
title: "Type Alias: MessageSubscriptionSearchQuery"
sidebar_label: "MessageSubscriptionSearchQuery"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionSearchQuery

```ts
type MessageSubscriptionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5423](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5423)

## Type Declaration

### filter?

```ts
optional filter: MessageSubscriptionFilter;
```

The incident search filters.

### sort?

```ts
optional sort: MessageSubscriptionSearchQuerySortRequest[];
```

Sort field criteria.
