---
title: "Type Alias: GroupSearchQueryResult"
sidebar_label: "GroupSearchQueryResult"
mdx:
  format: md
---

# Type Alias: GroupSearchQueryResult

```ts
type GroupSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:2897](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2897)

Group search response.

## Type Declaration

### items?

```ts
optional items: GroupResult[];
```

The matching groups.
