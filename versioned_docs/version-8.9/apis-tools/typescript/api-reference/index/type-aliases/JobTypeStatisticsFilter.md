---
title: "Type Alias: JobTypeStatisticsFilter"
sidebar_label: "JobTypeStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobTypeStatisticsFilter

```ts
type JobTypeStatisticsFilter = object;
```

Job type statistics search filter.

## Properties

### from

```ts
from: string;
```

Start of the time window to filter metrics. ISO 8601 date-time format.

---

### jobType?

```ts
optional jobType?: StringFilterProperty;
```

Optional job type filter with advanced search capabilities.
Supports exact match, pattern matching, and other operators.

---

### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.
