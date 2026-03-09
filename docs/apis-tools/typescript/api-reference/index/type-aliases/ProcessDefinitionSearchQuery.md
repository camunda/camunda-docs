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

Defined in: [gen/types.gen.ts:5085](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5085)

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
