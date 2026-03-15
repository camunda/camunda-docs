---
title: "Type Alias: ProcessDefinitionSearchQuery"
sidebar_label: "ProcessDefinitionSearchQuery"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSearchQuery

```ts
type ProcessDefinitionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5737](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5737)

## Type Declaration

### filter?

```ts
optional filter: ProcessDefinitionFilter;
```

The process definition search filters.

### sort?

```ts
optional sort: ProcessDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
