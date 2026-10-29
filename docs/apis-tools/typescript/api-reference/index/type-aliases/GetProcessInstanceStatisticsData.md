---
title: "Type Alias: GetProcessInstanceStatisticsData"
sidebar_label: "GetProcessInstanceStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceStatisticsData

```ts
type GetProcessInstanceStatisticsData = object;
```

## Properties

### body?

```ts
body?: never;
```

---

### path

```ts
path: object;
```

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKeyWritable;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/statistics/element-instances";
```
