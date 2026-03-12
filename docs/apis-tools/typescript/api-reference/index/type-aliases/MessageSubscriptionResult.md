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

Defined in: [gen/types.gen.ts:5367](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5367)

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

Defined in: [gen/types.gen.ts:5411](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5411)

The correlation key of the message subscription.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5394](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5394)

The element ID associated with this message subscription.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5398](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5398)

The element instance key associated with this message subscription.

***

### lastUpdatedDate

```ts
lastUpdatedDate: string;
```

Defined in: [gen/types.gen.ts:5403](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5403)

The last updated date of the message subscription.

***

### messageName

```ts
messageName: string;
```

Defined in: [gen/types.gen.ts:5407](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5407)

The name of the message associated with the message subscription.

***

### messageSubscriptionKey

```ts
messageSubscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:5371](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5371)

The message subscription key associated with this message subscription.

***

### messageSubscriptionState

```ts
messageSubscriptionState: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:5399](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5399)

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5375](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5375)

The process definition ID associated with this message subscription.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey | null;
```

Defined in: [gen/types.gen.ts:5379](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5379)

The process definition key associated with this message subscription.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5383](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5383)

The process instance key associated with this message subscription.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5390](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5390)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5412](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5412)
