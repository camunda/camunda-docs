---
title: "Type Alias: JobErrorStatisticsItem"
sidebar_label: "JobErrorStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsItem

```ts
type JobErrorStatisticsItem = object;
```

Aggregated error metrics for a single error type and message combination.

## Properties

### errorCode

```ts
errorCode: string;
```

The error code identifier.

---

### errorMessage

```ts
errorMessage: string;
```

The error message.

---

### workers

```ts
workers: number;
```

Number of distinct workers that encountered this error.
