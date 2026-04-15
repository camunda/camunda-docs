---
title: "Type Alias: SearchElementInstanceIncidentsData"
sidebar_label: "SearchElementInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: SearchElementInstanceIncidentsData

```ts
type SearchElementInstanceIncidentsData = object;
```

## Properties

### body

```ts
body: IncidentSearchQuery;
```

---

### path

```ts
path: object;
```

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The unique key of the element instance to search incidents for.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/element-instances/{elementInstanceKey}/incidents/search";
```
