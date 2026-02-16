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

Defined in: [gen/types.gen.ts:4779](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4779)

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
