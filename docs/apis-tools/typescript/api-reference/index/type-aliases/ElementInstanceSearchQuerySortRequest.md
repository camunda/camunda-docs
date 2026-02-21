---
title: "Type Alias: ElementInstanceSearchQuerySortRequest"
sidebar_label: "ElementInstanceSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: ElementInstanceSearchQuerySortRequest

```ts
type ElementInstanceSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:2378](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2378)

## Properties

### field

```ts
field:
  | "elementInstanceKey"
  | "processInstanceKey"
  | "processDefinitionKey"
  | "processDefinitionId"
  | "startDate"
  | "endDate"
  | "elementId"
  | "elementName"
  | "type"
  | "state"
  | "incidentKey"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:2382](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2382)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:2383](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2383)
