---
title: "Type Alias: JobWorkerStatisticsItem"
sidebar_label: "JobWorkerStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobWorkerStatisticsItem

```ts
type JobWorkerStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3821](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3821)

Statistics for a single worker within a job type.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3827](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3827)

---

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3826](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3826)

---

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3828](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3828)

---

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:3825](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3825)

The name of the worker activating the jobs, mostly used for logging purposes.
