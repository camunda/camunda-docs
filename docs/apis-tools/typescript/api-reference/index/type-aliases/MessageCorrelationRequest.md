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

Defined in: [gen/types.gen.ts:5276](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5276)

## Properties

### correlationKey?

```ts
optional correlationKey?: string;
```

Defined in: [gen/types.gen.ts:5285](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5285)

The correlation key of the message.

---

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:5281](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5281)

The message name as defined in the BPMN process

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:5295](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5295)

the tenant for which the message is published

---

### variables?

```ts
optional variables?: object;
```

Defined in: [gen/types.gen.ts:5289](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5289)

The message variables as JSON document

#### Index Signature

```ts
[key: string]: unknown
```
