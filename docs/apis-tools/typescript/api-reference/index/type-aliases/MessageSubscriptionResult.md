---
title: "Type Alias: MessageSubscriptionResult"
sidebar_label: "MessageSubscriptionResult"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionResult

```ts
type MessageSubscriptionResult = object;
```

Defined in: [gen/types.gen.ts:5370](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5370)

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

Defined in: [gen/types.gen.ts:5414](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5414)

The correlation key of the message subscription.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5397](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5397)

The element ID associated with this message subscription.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5401](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5401)

The element instance key associated with this message subscription.

---

### lastUpdatedDate

```ts
lastUpdatedDate: string;
```

Defined in: [gen/types.gen.ts:5406](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5406)

The last updated date of the message subscription.

---

### messageName

```ts
messageName: string;
```

Defined in: [gen/types.gen.ts:5410](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5410)

The name of the message associated with the message subscription.

---

### messageSubscriptionKey

```ts
messageSubscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:5374](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5374)

The message subscription key associated with this message subscription.

---

### messageSubscriptionState

```ts
messageSubscriptionState: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:5402](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5402)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5378](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5378)

The process definition ID associated with this message subscription.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey | null;
```

Defined in: [gen/types.gen.ts:5382](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5382)

The process definition key associated with this message subscription.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5386](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5386)

The process instance key associated with this message subscription.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5393](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5393)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5415](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5415)
