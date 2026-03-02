---
title: "Type Alias: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest"
sidebar_label: "IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest

```ts
type IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:3303](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3303)

## Properties

### field

```ts
field: "activeInstancesWithErrorCount" | "processDefinitionKey" | "tenantId";
```

Defined in: [gen/types.gen.ts:3307](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3307)

The aggregated field by which the process instance statistics are sorted.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3308](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3308)
