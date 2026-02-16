---
title: "Type Alias: SearchMessageSubscriptionsData"
sidebar_label: "SearchMessageSubscriptionsData"
mdx:
  format: md
---

# Type Alias: SearchMessageSubscriptionsData

```ts
type SearchMessageSubscriptionsData = object;
```

Defined in: [gen/types.gen.ts:12415](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12415)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:12416](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12416)

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

Message subscription search filter.

###### filter.correlationKey?

```ts
optional correlationKey: StringFilterProperty;
```

The correlation key of the message subscription.

###### filter.elementId?

```ts
optional elementId: StringFilterProperty;
```

The element ID associated with this message subscription.

###### filter.elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

The element instance key associated with this message subscription.

###### filter.lastUpdatedDate?

```ts
optional lastUpdatedDate: DateTimeFilterProperty;
```

The last updated date of the message subscription.

###### filter.messageName?

```ts
optional messageName: StringFilterProperty;
```

The name of the message associated with the message subscription.

###### filter.messageSubscriptionKey?

```ts
optional messageSubscriptionKey: MessageSubscriptionKeyFilterProperty;
```

The message subscription key associated with this message subscription.

###### filter.messageSubscriptionState?

```ts
optional messageSubscriptionState: MessageSubscriptionStateFilterProperty;
```

The message subscription state.

###### filter.processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

The process definition ID associated with this message subscription.

###### filter.processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

###### filter.processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with this message subscription.

###### filter.tenantId?

```ts
optional tenantId: StringFilterProperty;
```

The unique external tenant ID.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:12477](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12477)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:12478](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12478)

---

### url

```ts
url: "/message-subscriptions/search";
```

Defined in: [gen/types.gen.ts:12479](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12479)
