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

Defined in: [gen/types.gen.ts:5578](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5578)

Correlated message subscriptions search filter.

## Properties

### correlationKey?

```ts
optional correlationKey: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5582](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5582)

The correlation key of the message.

***

### correlationTime?

```ts
optional correlationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5586](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5586)

The time when the message was correlated.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5590](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5590)

The element ID that received the message.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5594](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5594)

The element instance key that received the message.

***

### messageKey?

```ts
optional messageKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:5598](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5598)

The message key.

***

### messageName?

```ts
optional messageName: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5602](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5602)

The name of the message.

***

### partitionId?

```ts
optional partitionId: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:5606](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5606)

The partition ID that correlated the message.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5610](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5610)

The process definition ID associated with this correlated message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5614](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5614)

The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5618](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5618)

The process instance key associated with this correlated message subscription.

***

### subscriptionKey?

```ts
optional subscriptionKey: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5622](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5622)

The subscription key that received the message.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5626](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5626)

The tenant ID associated with this correlated message subscription.
