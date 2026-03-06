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

Defined in: [gen/types.gen.ts:5232](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5232)

The message key of the correlated message, as well as the first process instance key it
correlated with.

## Properties

### messageKey

```ts
messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:5240](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5240)

The key of the correlated message.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5244](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5244)

The key of the first process instance the message correlated with

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5236](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5236)

The tenant ID of the correlated message
