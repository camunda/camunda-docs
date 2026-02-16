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

Defined in: [gen/types.gen.ts:5801](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5801)

Process instance search response.

## Type Declaration

### items

```ts
items: ProcessInstanceResult[];
```

The matching process instances.
