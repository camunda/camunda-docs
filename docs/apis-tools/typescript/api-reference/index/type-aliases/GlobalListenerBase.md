---
title: "Type Alias: GlobalListenerBase"
sidebar_label: "GlobalListenerBase"
mdx:
  format: md
---

# Type Alias: GlobalListenerBase

```ts
type GlobalListenerBase = object;
```

Defined in: [gen/types.gen.ts:2950](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2950)

## Properties

### afterNonGlobal?

```ts
optional afterNonGlobal?: boolean;
```

Defined in: [gen/types.gen.ts:2962](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2962)

Whether the listener should run after model-level listeners.

---

### priority?

```ts
optional priority?: number;
```

Defined in: [gen/types.gen.ts:2966](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2966)

The priority of the listener. Higher priority listeners are executed before lower priority ones.

---

### retries?

```ts
optional retries?: number;
```

Defined in: [gen/types.gen.ts:2958](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2958)

Number of retries for the listener job.

---

### type?

```ts
optional type?: string;
```

Defined in: [gen/types.gen.ts:2954](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2954)

The name of the job type, used as a reference to specify which job workers request the respective listener job.
