---
title: "Type Alias: UserTaskSearchQueryResult"
sidebar_label: "UserTaskSearchQueryResult"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQueryResult

```ts
type UserTaskSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:7501](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7501)

User task search query response.

## Type Declaration

### items

```ts
items: UserTaskResult[];
```

The matching user tasks.
