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

Defined in: [gen/types.gen.ts:5491](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5491)

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

Defined in: [gen/types.gen.ts:5495](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5495)

The correlation key of the message.

***

### correlationTime

```ts
correlationTime: string;
```

Defined in: [gen/types.gen.ts:5499](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5499)

The time when the message was correlated.

***

### elementId

```ts
elementId: string;
```

Defined in: [gen/types.gen.ts:5503](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5503)

The element ID that received the message.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5509](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5509)

The element instance key that received the message.
It is `null` for start event subscriptions.

***

### messageKey

```ts
messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:5513](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5513)

The message key.

***

### messageName

```ts
messageName: string;
```

Defined in: [gen/types.gen.ts:5517](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5517)

The name of the message.

***

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:5521](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5521)

The partition ID that correlated the message.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5525](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5525)

The process definition ID associated with this correlated message subscription.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5529](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5529)

The process definition key associated with this correlated message subscription.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5533](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5533)

The process instance key associated with this correlated message subscription.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5540](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5540)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### subscriptionKey

```ts
subscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:5544](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5544)

The subscription key that received the message.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5548](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5548)

The tenant ID associated with this correlated message subscription.
