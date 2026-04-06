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

Defined in: [gen/types.gen.ts:5318](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5318)

## Properties

### correlationKey?

```ts
optional correlationKey?: string;
```

Defined in: [gen/types.gen.ts:5326](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5326)

The correlation key of the message.

---

### messageId?

```ts
optional messageId?: string;
```

Defined in: [gen/types.gen.ts:5336](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5336)

The unique ID of the message. This is used to ensure only one message with the given ID
will be published during the lifetime of the message (if `timeToLive` is set).

---

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:5322](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5322)

The name of the message.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:5346](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5346)

The tenant of the message sender.

---

### timeToLive?

```ts
optional timeToLive?: number;
```

Defined in: [gen/types.gen.ts:5330](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5330)

Timespan (in ms) to buffer the message on the broker.

---

### variables?

```ts
optional variables?: object;
```

Defined in: [gen/types.gen.ts:5340](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5340)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
