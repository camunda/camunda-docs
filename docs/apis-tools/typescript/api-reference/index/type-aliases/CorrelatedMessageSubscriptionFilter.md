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

Defined in: [gen/types.gen.ts:5508](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5508)

Correlated message subscriptions search filter.

## Properties

### correlationKey?

```ts
optional correlationKey: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5512](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5512)

The correlation key of the message.

***

### correlationTime?

```ts
optional correlationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5516](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5516)

The time when the message was correlated.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5520](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5520)

The element ID that received the message.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5524](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5524)

The element instance key that received the message.

***

### messageKey?

```ts
optional messageKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:5528](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5528)

The message key.

***

### messageName?

```ts
optional messageName: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5532](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5532)

The name of the message.

***

### partitionId?

```ts
optional partitionId: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:5536](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5536)

The partition ID that correlated the message.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5540](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5540)

The process definition ID associated with this correlated message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5544](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5544)

The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5548](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5548)

The process instance key associated with this correlated message subscription.

***

### subscriptionKey?

```ts
optional subscriptionKey: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5552)

The subscription key that received the message.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5556](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5556)

The tenant ID associated with this correlated message subscription.
