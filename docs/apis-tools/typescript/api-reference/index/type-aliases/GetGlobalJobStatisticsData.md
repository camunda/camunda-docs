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

Defined in: [gen/types.gen.ts:12018](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12018)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:12019](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12019)

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:12020](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12020)

***

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:12021](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12021)

#### from

```ts
from: string;
```

Start of the time window to filter metrics. ISO 8601 date-time format.

#### jobType?

```ts
optional jobType: string;
```

Optional job type to limit the aggregation to a single job type.

#### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.

***

### url

```ts
url: "/jobs/statistics/global";
```

Defined in: [gen/types.gen.ts:12037](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12037)
