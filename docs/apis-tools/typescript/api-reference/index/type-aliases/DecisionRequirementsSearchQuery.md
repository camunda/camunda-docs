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

Defined in: [gen/types.gen.ts:1921](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1921)

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
