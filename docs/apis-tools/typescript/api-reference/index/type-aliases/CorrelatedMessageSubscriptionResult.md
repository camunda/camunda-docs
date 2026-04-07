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

Defined in: [gen/types.gen.ts:5494](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5494)

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

Defined in: [gen/types.gen.ts:5498](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5498)

The correlation key of the message.

---

### correlationTime

```ts
correlationTime: string;
```

Defined in: [gen/types.gen.ts:5502](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5502)

The time when the message was correlated.

---

### elementId

```ts
elementId: string;
```

Defined in: [gen/types.gen.ts:5506](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5506)

The element ID that received the message.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5512](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5512)

The element instance key that received the message.
It is `null` for start event subscriptions.

---

### messageKey

```ts
messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:5516](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5516)

The message key.

---

### messageName

```ts
messageName: string;
```

Defined in: [gen/types.gen.ts:5520](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5520)

The name of the message.

---

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:5524](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5524)

The partition ID that correlated the message.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5528](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5528)

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5532](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5532)

The process definition key associated with this correlated message subscription.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5536](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5536)

The process instance key associated with this correlated message subscription.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5543](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5543)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### subscriptionKey

```ts
subscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:5547](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5547)

The subscription key that received the message.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5551](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5551)

The tenant ID associated with this correlated message subscription.
