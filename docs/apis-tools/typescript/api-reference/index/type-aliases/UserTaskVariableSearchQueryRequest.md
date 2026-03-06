---
title: "Type Alias: UserTaskVariableSearchQueryRequest"
sidebar_label: "UserTaskVariableSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: UserTaskVariableSearchQueryRequest

```ts
type UserTaskVariableSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:7699](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7699)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter: UserTaskVariableFilter;
```

The user task variable search filters.

### sort?

```ts
optional sort: UserTaskVariableSearchQuerySortRequest[];
```

Sort field criteria.
