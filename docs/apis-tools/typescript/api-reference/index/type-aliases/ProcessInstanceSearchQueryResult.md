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

Defined in: [gen/types.gen.ts:6489](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6489)

Process instance search response.

## Type Declaration

### items

```ts
items: ProcessInstanceResult[];
```

The matching process instances.
