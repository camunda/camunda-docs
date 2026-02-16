---
title: "Type Alias: MessageSubscriptionSearchQuerySortRequest"
sidebar_label: "MessageSubscriptionSearchQuerySortRequest"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionSearchQuerySortRequest

```ts
type MessageSubscriptionSearchQuerySortRequest = object;
```

Defined in: [gen/types.gen.ts:4771](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4771)

## Properties

### field

```ts
field:
  | "messageSubscriptionKey"
  | "processDefinitionId"
  | "processInstanceKey"
  | "elementId"
  | "elementInstanceKey"
  | "messageSubscriptionState"
  | "lastUpdatedDate"
  | "messageName"
  | "correlationKey"
  | "tenantId";
```

Defined in: [gen/types.gen.ts:4775](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4775)

The field to sort by.

---

### order?

```ts
optional order: SortOrderEnum;
```

Defined in: [gen/types.gen.ts:4776](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4776)
