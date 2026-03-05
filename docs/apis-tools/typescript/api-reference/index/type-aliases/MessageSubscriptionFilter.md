---
title: "Type Alias: MessageSubscriptionFilter"
sidebar_label: "MessageSubscriptionFilter"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionFilter

```ts
type MessageSubscriptionFilter = object;
```

Defined in: [gen/types.gen.ts:5369](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5369)

Message subscription search filter.

## Properties

### correlationKey?

```ts
optional correlationKey: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5409](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5409)

The correlation key of the message subscription.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5389](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5389)

The element ID associated with this message subscription.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5393](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5393)

The element instance key associated with this message subscription.

***

### lastUpdatedDate?

```ts
optional lastUpdatedDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5401](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5401)

The last updated date of the message subscription.

***

### messageName?

```ts
optional messageName: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5405](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5405)

The name of the message associated with the message subscription.

***

### messageSubscriptionKey?

```ts
optional messageSubscriptionKey: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5373](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5373)

The message subscription key associated with this message subscription.

***

### messageSubscriptionState?

```ts
optional messageSubscriptionState: MessageSubscriptionStateFilterProperty;
```

Defined in: [gen/types.gen.ts:5397](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5397)

The message subscription state.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5381](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5381)

The process definition ID associated with this message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5377](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5377)

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5385](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5385)

The process instance key associated with this message subscription.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5413](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5413)

The unique external tenant ID.
