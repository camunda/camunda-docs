---
title: "Type Alias: IncidentProcessInstanceStatisticsByErrorQueryResult"
sidebar_label: "IncidentProcessInstanceStatisticsByErrorQueryResult"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByErrorQueryResult

```ts
type IncidentProcessInstanceStatisticsByErrorQueryResult = SearchQueryResponse &
  object;
```

Defined in: [gen/types.gen.ts:3216](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3216)

## Type Declaration

### items?

```ts
optional items: IncidentProcessInstanceStatisticsByErrorResult[];
```

Statistics of active process instances grouped by incident error.
