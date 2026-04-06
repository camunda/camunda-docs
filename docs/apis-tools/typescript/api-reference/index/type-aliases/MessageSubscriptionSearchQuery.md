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

Defined in: [gen/types.gen.ts:5426](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5426)

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
