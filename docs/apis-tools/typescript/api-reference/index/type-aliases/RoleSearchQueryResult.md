---
title: "Type Alias: RoleSearchQueryResult"
sidebar_label: "RoleSearchQueryResult"
mdx:
  format: md
---

# Type Alias: RoleSearchQueryResult

```ts
type RoleSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:6303](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6303)

Role search response.

## Type Declaration

### items?

```ts
optional items: RoleResult[];
```

The matching roles.
