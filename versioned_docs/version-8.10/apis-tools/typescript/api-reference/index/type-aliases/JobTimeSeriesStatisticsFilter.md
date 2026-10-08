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

Job time-series statistics search filter.

## Properties

### from

```ts
from: string;
```

Start of the time window to filter metrics. ISO 8601 date-time format.

---

### jobType

```ts
jobType: string;
```

Job type to return time-series metrics for.

---

### resolution?

```ts
optional resolution?: string;
```

Time bucket resolution as an ISO 8601 duration (for example `PT1M` for 1 minute,
`PT1H` for 1 hour). If omitted, the server chooses a sensible default.

---

### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.
