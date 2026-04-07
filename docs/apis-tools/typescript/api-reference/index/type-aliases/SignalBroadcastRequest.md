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

Defined in: [gen/types.gen.ts:7210](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7210)

## Properties

### signalName

```ts
signalName: string;
```

Defined in: [gen/types.gen.ts:7214](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7214)

The name of the signal to broadcast.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:7224](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7224)

The ID of the tenant that owns the signal.

---

### variables?

```ts
optional variables?: object;
```

Defined in: [gen/types.gen.ts:7218](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7218)

The signal variables as a JSON object.

#### Index Signature

```ts
[key: string]: unknown
```
