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

Defined in: [gen/types.gen.ts:5440](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5440)

Message subscription search filter.

## Properties

### correlationKey?

```ts
optional correlationKey?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5480](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5480)

The correlation key of the message subscription.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5460](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5460)

The element ID associated with this message subscription.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5464](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5464)

The element instance key associated with this message subscription.

---

### lastUpdatedDate?

```ts
optional lastUpdatedDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5472](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5472)

The last updated date of the message subscription.

---

### messageName?

```ts
optional messageName?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5476](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5476)

The name of the message associated with the message subscription.

---

### messageSubscriptionKey?

```ts
optional messageSubscriptionKey?: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5444](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5444)

The message subscription key associated with this message subscription.

---

### messageSubscriptionState?

```ts
optional messageSubscriptionState?: MessageSubscriptionStateFilterProperty;
```

Defined in: [gen/types.gen.ts:5468](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5468)

The message subscription state.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5452](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5452)

The process definition ID associated with this message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5448](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5448)

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5456](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5456)

The process instance key associated with this message subscription.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5484](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5484)

The unique external tenant ID.
