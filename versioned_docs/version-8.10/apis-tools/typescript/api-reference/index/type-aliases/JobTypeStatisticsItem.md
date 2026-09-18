---
title: "Type Alias: JobTypeStatisticsItem"
sidebar_label: "JobTypeStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobTypeStatisticsItem

```ts
type JobTypeStatisticsItem = object;
```

Statistics for a single job type.

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

### jobType

```ts
jobType: string;
```

The job type identifier.

---

### workers

```ts
workers: number;
```

Number of distinct workers observed for this job type.
