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

Defined in: [gen/types.gen.ts:5437](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5437)

Message subscription search filter.

## Properties

### correlationKey?

```ts
optional correlationKey: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5477](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5477)

The correlation key of the message subscription.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5457](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5457)

The element ID associated with this message subscription.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5461](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5461)

The element instance key associated with this message subscription.

***

### lastUpdatedDate?

```ts
optional lastUpdatedDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:5469](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5469)

The last updated date of the message subscription.

***

### messageName?

```ts
optional messageName: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5473](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5473)

The name of the message associated with the message subscription.

***

### messageSubscriptionKey?

```ts
optional messageSubscriptionKey: MessageSubscriptionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5441](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5441)

The message subscription key associated with this message subscription.

***

### messageSubscriptionState?

```ts
optional messageSubscriptionState: MessageSubscriptionStateFilterProperty;
```

Defined in: [gen/types.gen.ts:5465](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5465)

The message subscription state.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5449](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5449)

The process definition ID associated with this message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5445](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5445)

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:5453](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5453)

The process instance key associated with this message subscription.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5481](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5481)

The unique external tenant ID.
