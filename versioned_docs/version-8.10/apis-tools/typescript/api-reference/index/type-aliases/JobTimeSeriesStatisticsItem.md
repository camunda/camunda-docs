---
title: "Type Alias: JobTimeSeriesStatisticsItem"
sidebar_label: "JobTimeSeriesStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobTimeSeriesStatisticsItem

```ts
type JobTimeSeriesStatisticsItem = object;
```

Aggregated job metrics for a single time bucket.

## Properties

### completed

```ts
completed: StatusMetric;
```

---

### created

```ts
created: StatusMetric;
```

---

### failed

```ts
failed: StatusMetric;
```

---

### time

```ts
time: string;
```

ISO 8601 timestamp representing the start of this time bucket.
