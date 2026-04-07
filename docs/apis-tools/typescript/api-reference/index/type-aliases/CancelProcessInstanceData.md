---
title: "Type Alias: CancelProcessInstanceData"
sidebar_label: "CancelProcessInstanceData"
mdx:
  format: md
---

# Type Alias: CancelProcessInstanceData

```ts
type CancelProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13317](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13317)

## Properties

### body?

```ts
optional body?:
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13318](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13318)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13321](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13321)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to cancel.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13327](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13327)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/cancellation";
```

Defined in: [gen/types.gen.ts:13328](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13328)
