---
title: "Type Alias: GetProcessInstanceCallHierarchyData"
sidebar_label: "GetProcessInstanceCallHierarchyData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceCallHierarchyData

```ts
type GetProcessInstanceCallHierarchyData = object;
```

Defined in: [gen/types.gen.ts:13271](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13271)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:13272](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13272)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13273](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13273)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to fetch the hierarchy for.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13279](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13279)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/call-hierarchy";
```

Defined in: [gen/types.gen.ts:13280](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13280)
