---
title: "Type Alias: GlobalJobStatisticsQueryResult"
sidebar_label: "GlobalJobStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: GlobalJobStatisticsQueryResult

```ts
type GlobalJobStatisticsQueryResult = object;
```

Global job statistics query result.

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

### isIncomplete

```ts
isIncomplete: boolean;
```

True if some data is missing because internal limits were reached and some metrics were not recorded.
