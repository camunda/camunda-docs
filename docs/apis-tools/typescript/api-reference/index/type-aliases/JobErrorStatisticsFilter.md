---
title: "Type Alias: JobErrorStatisticsFilter"
sidebar_label: "JobErrorStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsFilter

```ts
type JobErrorStatisticsFilter = object;
```

Job error statistics search filter.

## Properties

### errorCode?

```ts
errorCode?: StringFilterProperty;
```

Optional error code filter with advanced search capabilities.

---

### errorMessage?

```ts
errorMessage?: StringFilterProperty;
```

Optional error message filter with advanced search capabilities.

---

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

Job type to return error metrics for.

---

### to

```ts
to: string;
```

End of the time window to filter metrics. ISO 8601 date-time format.
