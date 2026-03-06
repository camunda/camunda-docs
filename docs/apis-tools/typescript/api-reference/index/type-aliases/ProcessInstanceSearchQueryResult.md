---
title: "Type Alias: ProcessInstanceSearchQueryResult"
sidebar_label: "ProcessInstanceSearchQueryResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSearchQueryResult

```ts
type ProcessInstanceSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:6403](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6403)

Process instance search response.

## Type Declaration

### items

```ts
items: ProcessInstanceResult[];
```

The matching process instances.
