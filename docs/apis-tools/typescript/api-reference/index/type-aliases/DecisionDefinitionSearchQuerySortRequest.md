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

Defined in: [gen/types.gen.ts:1431](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1431)

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

Defined in: [gen/types.gen.ts:1435](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1435)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:1436](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1436)
