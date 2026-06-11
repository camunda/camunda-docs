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
optional body?: IncidentSearchQuery;
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
url: "/process-instances/{processInstanceKey}/incidents/search";
```
