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

Defined in: [gen/types.gen.ts:5355](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5355)

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
