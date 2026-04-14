---
title: "Type Alias: GetProcessDefinitionStatisticsData"
sidebar_label: "GetProcessDefinitionStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionStatisticsData

```ts
type GetProcessDefinitionStatisticsData = object;
```

## Properties

### body?

```ts
optional body?: ProcessDefinitionElementStatisticsQuery;
```

---

### path

```ts
path: object;
```

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-definitions/{processDefinitionKey}/statistics/element-instances";
```
