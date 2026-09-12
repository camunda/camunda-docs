---
title: "Type Alias: JobWorkerStatisticsItem"
sidebar_label: "JobWorkerStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobWorkerStatisticsItem

```ts
type JobWorkerStatisticsItem = object;
```

Statistics for a single worker within a job type.

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

### worker

```ts
worker: string;
```

The name of the worker activating the jobs, mostly used for logging purposes.
