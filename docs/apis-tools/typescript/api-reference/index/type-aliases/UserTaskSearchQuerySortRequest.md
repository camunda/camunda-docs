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

Defined in: [gen/types.gen.ts:6744](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6744)

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

Defined in: [gen/types.gen.ts:6748](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6748)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:6749](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6749)
