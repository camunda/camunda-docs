---
title: "Type Alias: VariableSearchQuerySortRequest"
sidebar_label: "VariableSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: VariableSearchQuerySortRequest

```ts
type VariableSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:7244](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7244)

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

Defined in: [gen/types.gen.ts:7248](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7248)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7249](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7249)
