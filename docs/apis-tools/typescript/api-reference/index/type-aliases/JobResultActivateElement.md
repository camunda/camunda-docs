---
title: "Type Alias: JobResultActivateElement"
sidebar_label: "JobResultActivateElement"
mdx:
  format: md
---

# Type Alias: JobResultActivateElement

```ts
type JobResultActivateElement = object;
```

Defined in: [gen/types.gen.ts:4505](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4505)

Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element.

## Properties

### elementId?

```ts
optional elementId?: ElementId;
```

Defined in: [gen/types.gen.ts:4509](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4509)

The element ID to activate.

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:4513](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4513)

Variables for the element.
