---
title: "Type Alias: MessageCorrelationRequest"
sidebar_label: "MessageCorrelationRequest"
mdx:
  format: md
---

# Type Alias: MessageCorrelationRequest

```ts
type MessageCorrelationRequest = object;
```

Defined in: [gen/types.gen.ts:5205](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5205)

## Properties

### correlationKey?

```ts
optional correlationKey: string;
```

Defined in: [gen/types.gen.ts:5214](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5214)

The correlation key of the message.

***

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:5210](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5210)

The message name as defined in the BPMN process

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5224](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5224)

the tenant for which the message is published

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:5218](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5218)

The message variables as JSON document

#### Index Signature

```ts
[key: string]: unknown
```
