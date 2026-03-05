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

Defined in: [gen/types.gen.ts:5659](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5659)

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

Defined in: [gen/types.gen.ts:5663](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5663)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5664](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5664)
