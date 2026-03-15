---
title: "Type Alias: DecisionRequirementsSearchQuery"
sidebar_label: "DecisionRequirementsSearchQuery"
mdx:
  format: md
---

# Type Alias: DecisionRequirementsSearchQuery

```ts
type DecisionRequirementsSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:1986](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1986)

## Type Declaration

### filter?

```ts
optional filter: DecisionRequirementsFilter;
```

The decision definition search filters.

### sort?

```ts
optional sort: DecisionRequirementsSearchQuerySortRequest[];
```

Sort field criteria.
