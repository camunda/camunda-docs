---
title: "Type Alias: UserTaskVariableSearchQuerySortRequest"
sidebar_label: "UserTaskVariableSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: UserTaskVariableSearchQuerySortRequest

```ts
type UserTaskVariableSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:7026](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7026)

## Properties

### field

```ts
field:
  | "value"
  | "name"
  | "tenantId"
  | "variableKey"
  | "scopeKey"
  | "processInstanceKey";
```

Defined in: [gen/types.gen.ts:7030](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7030)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7031](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7031)
