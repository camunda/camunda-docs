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

Defined in: [gen/types.gen.ts:3842](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3842)

Job time-series statistics search filter.

## Properties

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3847](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3847)

Start of the time window to filter metrics. ISO 8601 date-time format.

***

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3856](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3856)

Job type to return time-series metrics for.

***

### resolution?

```ts
optional resolution: string;
```

Defined in: [gen/types.gen.ts:3862](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3862)

Time bucket resolution as an ISO 8601 duration (for example `PT1M` for 1 minute,
`PT1H` for 1 hour). If omitted, the server chooses a sensible default.

***

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3852](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3852)

End of the time window to filter metrics. ISO 8601 date-time format.
