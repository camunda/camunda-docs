---
title: "Type Alias: ResolveProcessInstanceIncidentsData"
sidebar_label: "ResolveProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: ResolveProcessInstanceIncidentsData

```ts
type ResolveProcessInstanceIncidentsData = object;
```

Defined in: [gen/types.gen.ts:13421](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13421)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:13422](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13422)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13423](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13423)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to resolve incidents for.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13429](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13429)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/incident-resolution";
```

Defined in: [gen/types.gen.ts:13430](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13430)
