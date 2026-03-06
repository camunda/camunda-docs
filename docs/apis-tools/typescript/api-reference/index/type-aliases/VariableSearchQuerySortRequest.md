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

Defined in: [gen/types.gen.ts:7908](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7908)

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

Defined in: [gen/types.gen.ts:7912](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7912)

The field to sort by.

***

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:7913](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7913)
