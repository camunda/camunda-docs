---
title: "Type Alias: UserTaskSearchQuery"
sidebar_label: "UserTaskSearchQuery"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQuery

```ts
type UserTaskSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:7403](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7403)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter: UserTaskFilter;
```

The user task search filters.

### sort?

```ts
optional sort: UserTaskSearchQuerySortRequest[];
```

Sort field criteria.
