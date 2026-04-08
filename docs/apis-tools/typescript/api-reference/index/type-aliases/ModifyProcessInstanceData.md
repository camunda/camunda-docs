---
title: "Type Alias: ModifyProcessInstanceData"
sidebar_label: "ModifyProcessInstanceData"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceData

```ts
type ModifyProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13562](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13562)

## Properties

### body

```ts
body: ProcessInstanceModificationInstruction;
```

Defined in: [gen/types.gen.ts:13563](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13563)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13564](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13564)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be modified.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13570](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13570)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/modification";
```

Defined in: [gen/types.gen.ts:13571](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13571)
