---
title: "Type Alias: SignalBroadcastRequest"
sidebar_label: "SignalBroadcastRequest"
mdx:
  format: md
---

# Type Alias: SignalBroadcastRequest

```ts
type SignalBroadcastRequest = object;
```

Defined in: [gen/types.gen.ts:7125](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7125)

## Properties

### signalName

```ts
signalName: string;
```

Defined in: [gen/types.gen.ts:7129](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7129)

The name of the signal to broadcast.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7139](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7139)

The ID of the tenant that owns the signal.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:7133](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7133)

The signal variables as a JSON object.

#### Index Signature

```ts
[key: string]: unknown
```
