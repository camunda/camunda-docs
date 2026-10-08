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

Global listener search query request.

## Type Declaration

### filter?

```ts
optional filter?: GlobalTaskListenerSearchQueryFilterRequest;
```

The global listener search filters.

### sort?

```ts
optional sort?: GlobalTaskListenerSearchQuerySortRequest[];
```

Sort field criteria.
