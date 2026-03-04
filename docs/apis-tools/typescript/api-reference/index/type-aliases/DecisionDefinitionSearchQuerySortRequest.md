---
title: "Type Alias: DecisionDefinitionSearchQuerySortRequest"
sidebar_label: "DecisionDefinitionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionSearchQuerySortRequest

```ts
type DecisionDefinitionSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:1400](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1400)

## Properties

### field

```ts
field:
  | "decisionDefinitionKey"
  | "decisionDefinitionId"
  | "name"
  | "version"
  | "decisionRequirementsId"
  | "decisionRequirementsKey"
  | "decisionRequirementsName"
  | "decisionRequirementsVersion"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:1404](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1404)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1405](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1405)
