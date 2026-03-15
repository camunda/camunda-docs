---
title: "Type Alias: ProcessDefinitionSearchQuerySortRequest"
sidebar_label: "ProcessDefinitionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSearchQuerySortRequest

```ts
type ProcessDefinitionSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:5729](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5729)

## Properties

### field

```ts
field: 
  | "processDefinitionKey"
  | "name"
  | "resourceName"
  | "version"
  | "versionTag"
  | "processDefinitionId"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:5733](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5733)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5734](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5734)
