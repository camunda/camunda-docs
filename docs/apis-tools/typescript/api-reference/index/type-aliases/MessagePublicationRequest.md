---
title: "Type Alias: MessagePublicationRequest"
sidebar_label: "MessagePublicationRequest"
mdx:
  format: md
---

# Type Alias: MessagePublicationRequest

```ts
type MessagePublicationRequest = object;
```

Defined in: [gen/types.gen.ts:5247](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5247)

## Properties

### correlationKey?

```ts
optional correlationKey: string;
```

Defined in: [gen/types.gen.ts:5255](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5255)

The correlation key of the message.

***

### messageId?

```ts
optional messageId: string;
```

Defined in: [gen/types.gen.ts:5265](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5265)

The unique ID of the message. This is used to ensure only one message with the given ID
will be published during the lifetime of the message (if `timeToLive` is set).

***

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:5251](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5251)

The name of the message.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5275](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5275)

The tenant of the message sender.

***

### timeToLive?

```ts
optional timeToLive: number;
```

Defined in: [gen/types.gen.ts:5259](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5259)

Timespan (in ms) to buffer the message on the broker.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:5269](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5269)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
