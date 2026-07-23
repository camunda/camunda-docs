---
title: "Type Alias: GetProcessInstanceWaitStateStatisticsData"
sidebar_label: "GetProcessInstanceWaitStateStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceWaitStateStatisticsData

```ts
type GetProcessInstanceWaitStateStatisticsData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/statistics/wait-states";
```
