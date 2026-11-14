---
title: "Type Alias: SearchProcessInstanceIncidentsData"
sidebar_label: "SearchProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: SearchProcessInstanceIncidentsData

```ts
type SearchProcessInstanceIncidentsData = object;
```

## Properties

### body?

```ts
body?: IncidentSearchQuery;
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
url: "/process-instances/{processInstanceKey}/incidents/search";
```
