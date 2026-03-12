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

Defined in: [gen/types.gen.ts:7506](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7506)

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

Defined in: [gen/types.gen.ts:7510](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7510)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7511](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7511)
