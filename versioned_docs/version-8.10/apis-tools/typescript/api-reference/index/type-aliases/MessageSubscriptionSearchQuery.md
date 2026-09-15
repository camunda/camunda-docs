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

## Type Declaration

### filter?

```ts
optional filter?: MessageSubscriptionFilter;
```

The incident search filters.

### sort?

```ts
optional sort?: MessageSubscriptionSearchQuerySortRequest[];
```

Sort field criteria.
