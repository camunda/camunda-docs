---
title: "Type Alias: JobTimeSeriesStatisticsItem"
sidebar_label: "JobTimeSeriesStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobTimeSeriesStatisticsItem

```ts
type JobTimeSeriesStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3882](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3882)

Aggregated job metrics for a single time bucket.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3888](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3888)

---

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3887](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3887)

---

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3889](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3889)

---

### time

```ts
time: string;
```

Defined in: [gen/types.gen.ts:3886](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3886)

ISO 8601 timestamp representing the start of this time bucket.
