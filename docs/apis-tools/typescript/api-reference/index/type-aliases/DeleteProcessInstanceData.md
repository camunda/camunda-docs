---
title: "Type Alias: DeleteProcessInstanceData"
sidebar_label: "DeleteProcessInstanceData"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstanceData

```ts
type DeleteProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13368](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13368)

## Properties

### body?

```ts
optional body?:
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13369](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13369)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13372](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13372)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to delete.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13378](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13378)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/deletion";
```

Defined in: [gen/types.gen.ts:13379](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13379)
