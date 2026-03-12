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

Defined in: [gen/types.gen.ts:1435](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1435)

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

Defined in: [gen/types.gen.ts:1439](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1439)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1440](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1440)
