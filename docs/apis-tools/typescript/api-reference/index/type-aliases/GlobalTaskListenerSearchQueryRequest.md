---
title: "Type Alias: GlobalTaskListenerSearchQueryRequest"
sidebar_label: "GlobalTaskListenerSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: GlobalTaskListenerSearchQueryRequest

```ts
type GlobalTaskListenerSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:2991](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2991)

Global listener search query request.

## Type Declaration

### filter?

```ts
optional filter: GlobalTaskListenerSearchQueryFilterRequest;
```

The global listener search filters.

### sort?

```ts
optional sort: GlobalTaskListenerSearchQuerySortRequest[];
```

Sort field criteria.
