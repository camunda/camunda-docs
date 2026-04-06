---
title: "Type Alias: GetGlobalJobStatisticsData"
sidebar_label: "GetGlobalJobStatisticsData"
mdx:
  format: md
---

# Type Alias: GetGlobalJobStatisticsData

```ts
type GetGlobalJobStatisticsData = object;
```

Defined in: [gen/types.gen.ts:12058](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12058)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:12059](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12059)

---

### path?

```ts
optional path?: never;
```

Defined in: [gen/types.gen.ts:12060](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12060)

---

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:12061](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12061)

#### from

```ts
from: string;
```

Start of the time window to filter metrics. ISO 8601 date-time format.

#### jobType?

```ts
optional jobType?: string;
```

Optional job type to limit the aggregation to a single job type.

#### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.

---

### url

```ts
url: "/jobs/statistics/global";
```

Defined in: [gen/types.gen.ts:12077](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12077)
