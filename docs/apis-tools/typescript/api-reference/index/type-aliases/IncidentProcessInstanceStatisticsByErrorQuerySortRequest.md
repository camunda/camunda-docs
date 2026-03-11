---
title: "Type Alias: IncidentProcessInstanceStatisticsByErrorQuerySortRequest"
sidebar_label: "IncidentProcessInstanceStatisticsByErrorQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByErrorQuerySortRequest

```ts
type IncidentProcessInstanceStatisticsByErrorQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:3240](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3240)

## Properties

### field

```ts
field: "errorMessage" | "activeInstancesWithErrorCount";
```

Defined in: [gen/types.gen.ts:3244](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3244)

The field to sort the incident error statistics by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3245](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3245)
