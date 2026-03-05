---
title: "Type Alias: UserTaskSearchQuerySortRequest"
sidebar_label: "UserTaskSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQuerySortRequest

```ts
type UserTaskSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:7392](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7392)

## Properties

### field

```ts
field: 
  | "creationDate"
  | "completionDate"
  | "followUpDate"
  | "dueDate"
  | "priority"
  | "name";
```

Defined in: [gen/types.gen.ts:7396](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7396)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7397](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7397)
