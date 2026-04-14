---
title: "Type Alias: GetIncidentData"
sidebar_label: "GetIncidentData"
mdx:
  format: md
---

# Type Alias: GetIncidentData

```ts
type GetIncidentData = object;
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

#### incidentKey

```ts
incidentKey: IncidentKey;
```

The assigned key of the incident, which acts as a unique identifier for this incident.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/incidents/{incidentKey}";
```
