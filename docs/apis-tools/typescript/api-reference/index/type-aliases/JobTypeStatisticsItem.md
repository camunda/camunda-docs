---
title: "Type Alias: JobTypeStatisticsItem"
sidebar_label: "JobTypeStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobTypeStatisticsItem

```ts
type JobTypeStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3762](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3762)

Statistics for a single job type.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3768](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3768)

---

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3767](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3767)

---

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3769](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3769)

---

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3766](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3766)

The job type identifier.

---

### workers

```ts
workers: number;
```

Defined in: [gen/types.gen.ts:3773](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3773)

Number of distinct workers observed for this job type.
