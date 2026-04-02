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

Defined in: [gen/types.gen.ts:5581](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5581)

Correlated message subscriptions search filter.

## Properties

### correlationKey?

```ts
optional correlationKey?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5585](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5585)

The correlation key of the message.

---

### correlationTime?

```ts
optional correlationTime?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5589](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5589)

The time when the message was correlated.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5593](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5593)

The element ID that received the message.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5597](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5597)

The element instance key that received the message.

---

### messageKey?

```ts
optional messageKey?: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:5601](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5601)

The message key.

---

### messageName?

```ts
optional messageName?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5605](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5605)

The name of the message.

---

### partitionId?

```ts
optional partitionId?: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:5609](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5609)

The partition ID that correlated the message.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5613](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5613)

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5617](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5617)

The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5621](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5621)

The process instance key associated with this correlated message subscription.

---

### subscriptionKey?

```ts
optional subscriptionKey?: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5625](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5625)

The subscription key that received the message.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5629](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5629)

The tenant ID associated with this correlated message subscription.
