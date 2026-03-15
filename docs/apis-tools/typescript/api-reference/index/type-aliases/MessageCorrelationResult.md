---
title: "Type Alias: MessageCorrelationResult"
sidebar_label: "MessageCorrelationResult"
mdx:
  format: md
---

# Type Alias: MessageCorrelationResult

```ts
type MessageCorrelationResult = object;
```

Defined in: [gen/types.gen.ts:5300](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5300)

The message key of the correlated message, as well as the first process instance key it
correlated with.

## Properties

### messageKey

```ts
messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:5308](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5308)

The key of the correlated message.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5312](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5312)

The key of the first process instance the message correlated with

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5304](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5304)

The tenant ID of the correlated message
