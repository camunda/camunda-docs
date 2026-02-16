---
title: "Type Alias: IncidentSearchQuerySortRequest"
sidebar_label: "IncidentSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: IncidentSearchQuerySortRequest

```ts
type IncidentSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:3142](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3142)

## Properties

### field

```ts
field:
  | "incidentKey"
  | "processDefinitionKey"
  | "processDefinitionId"
  | "processInstanceKey"
  | "errorType"
  | "errorMessage"
  | "elementId"
  | "elementInstanceKey"
  | "creationTime"
  | "state"
  | "jobKey"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:3146](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3146)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:3147](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3147)
