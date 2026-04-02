---
title: "Type Alias: CorrelatedMessageSubscriptionSearchQuerySortRequest"
sidebar_label: "CorrelatedMessageSubscriptionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionSearchQuerySortRequest

```ts
type CorrelatedMessageSubscriptionSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:5565](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5565)

## Properties

### field

```ts
field:
  | "correlationKey"
  | "correlationTime"
  | "elementId"
  | "elementInstanceKey"
  | "messageKey"
  | "messageName"
  | "partitionId"
  | "processDefinitionId"
  | "processDefinitionKey"
  | "processInstanceKey"
  | "subscriptionKey"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:5569](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5569)

The field to sort by.

---

### order?

```ts
optional order?: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:5570](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5570)
