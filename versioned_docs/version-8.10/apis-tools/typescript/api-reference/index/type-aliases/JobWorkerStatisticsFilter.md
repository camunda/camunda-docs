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

Job worker statistics search filter.

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

Job type to return worker metrics for.

---

### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.
