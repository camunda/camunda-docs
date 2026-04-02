---
title: "Type Alias: JobTimeSeriesStatisticsFilter"
sidebar_label: "JobTimeSeriesStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobTimeSeriesStatisticsFilter

```ts
type JobTimeSeriesStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3845](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3845)

Job time-series statistics search filter.

## Properties

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3850](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3850)

Start of the time window to filter metrics. ISO 8601 date-time format.

---

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3859](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3859)

Job type to return time-series metrics for.

---

### resolution?

```ts
optional resolution?: string;
```

Defined in: [gen/types.gen.ts:3865](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3865)

Time bucket resolution as an ISO 8601 duration (for example `PT1M` for 1 minute,
`PT1H` for 1 hour). If omitted, the server chooses a sensible default.

---

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3855](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3855)

End of the time window to filter metrics. ISO 8601 date-time format.
