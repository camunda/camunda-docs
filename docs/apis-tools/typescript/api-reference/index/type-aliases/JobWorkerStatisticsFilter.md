---
title: "Type Alias: JobWorkerStatisticsFilter"
sidebar_label: "JobWorkerStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobWorkerStatisticsFilter

```ts
type JobWorkerStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3790](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3790)

Job worker statistics search filter.

## Properties

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3795](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3795)

Start of the time window to filter metrics. ISO 8601 date-time format.

---

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3804](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3804)

Job type to return worker metrics for.

---

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3800](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3800)

End of the time window to filter metrics. ISO 8601 date-time format.
