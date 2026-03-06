---
title: "Type Alias: CorrelatedMessageSubscriptionResult"
sidebar_label: "CorrelatedMessageSubscriptionResult"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionResult

```ts
type CorrelatedMessageSubscriptionResult = object;
```

Defined in: [gen/types.gen.ts:5423](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5423)

## Properties

### correlationKey

```ts
correlationKey: string;
```

Defined in: [gen/types.gen.ts:5427](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5427)

The correlation key of the message.

***

### correlationTime

```ts
correlationTime: string;
```

Defined in: [gen/types.gen.ts:5431](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5431)

The time when the message was correlated.

***

### elementId

```ts
elementId: string;
```

Defined in: [gen/types.gen.ts:5435](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5435)

The element ID that received the message.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:5439](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5439)

The element instance key that received the message.

***

### messageKey

```ts
messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:5443](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5443)

The message key.

***

### messageName

```ts
messageName: string;
```

Defined in: [gen/types.gen.ts:5447](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5447)

The name of the message.

***

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:5451](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5451)

The partition ID that correlated the message.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5455](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5455)

The process definition ID associated with this correlated message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5459](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5459)

The process definition key associated with this correlated message subscription.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5463](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5463)

The process instance key associated with this correlated message subscription.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5470](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5470)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### subscriptionKey

```ts
subscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:5474](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5474)

The subscription key that received the message.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5478](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5478)

The tenant ID associated with this correlated message subscription.
