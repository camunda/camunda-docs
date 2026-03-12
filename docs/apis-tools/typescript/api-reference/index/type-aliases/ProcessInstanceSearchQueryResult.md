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

Defined in: [gen/types.gen.ts:6478](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6478)

Process instance search response.

## Type Declaration

### items

```ts
items: ProcessInstanceResult[];
```

The matching process instances.
