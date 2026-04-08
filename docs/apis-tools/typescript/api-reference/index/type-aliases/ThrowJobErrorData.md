---
title: "Type Alias: ThrowJobErrorData"
sidebar_label: "ThrowJobErrorData"
mdx:
  format: md
---

# Type Alias: ThrowJobErrorData

```ts
type ThrowJobErrorData = object;
```

Defined in: [gen/types.gen.ts:11960](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11960)

## Properties

### body

```ts
body: JobErrorRequest;
```

Defined in: [gen/types.gen.ts:11961](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11961)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11962](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11962)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:11968](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11968)

---

### url

```ts
url: "/jobs/{jobKey}/error";
```

Defined in: [gen/types.gen.ts:11969](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11969)
