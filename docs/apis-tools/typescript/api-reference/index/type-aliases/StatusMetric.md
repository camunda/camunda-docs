---
title: "Type Alias: StatusMetric"
sidebar_label: "StatusMetric"
mdx:
  format: md
---

# Type Alias: StatusMetric

```ts
type StatusMetric = object;
```

Defined in: [gen/types.gen.ts:3704](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3704)

Metric for a single job status.

## Properties

### count

```ts
count: number;
```

Defined in: [gen/types.gen.ts:3708](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3708)

Number of jobs in this status.

---

### lastUpdatedAt

```ts
lastUpdatedAt: string | null;
```

Defined in: [gen/types.gen.ts:3712](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3712)

ISO 8601 timestamp of the last update for this status.
