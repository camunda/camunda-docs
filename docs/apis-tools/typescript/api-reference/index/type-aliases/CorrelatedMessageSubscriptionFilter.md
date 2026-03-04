---
title: "Type Alias: CorrelatedMessageSubscriptionFilter"
sidebar_label: "CorrelatedMessageSubscriptionFilter"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionFilter

```ts
type CorrelatedMessageSubscriptionFilter = object;
```

Defined in: [gen/types.gen.ts:4926](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4926)

Correlated message subscriptions search filter.

## Properties

### correlationKey?

```ts
optional correlationKey: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4930](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4930)

The correlation key of the message.

---

### correlationTime?

```ts
optional correlationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4934](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4934)

The time when the message was correlated.

---

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4938](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4938)

The element ID that received the message.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4942](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4942)

The element instance key that received the message.

---

### messageKey?

```ts
optional messageKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:4946](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4946)

The message key.

---

### messageName?

```ts
optional messageName: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4950](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4950)

The name of the message.

---

### partitionId?

```ts
optional partitionId: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:4954](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4954)

The partition ID that correlated the message.

---

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4958](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4958)

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4962](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4962)

The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4966](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4966)

The process instance key associated with this correlated message subscription.

---

### subscriptionKey?

```ts
optional subscriptionKey: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4970](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4970)

The subscription key that received the message.

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4974](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4974)

The tenant ID associated with this correlated message subscription.
