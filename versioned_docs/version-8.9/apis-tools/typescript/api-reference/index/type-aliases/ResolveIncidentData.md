---
title: "Type Alias: ResolveIncidentData"
sidebar_label: "ResolveIncidentData"
mdx:
  format: md
---

# Type Alias: ResolveIncidentData

```ts
type ResolveIncidentData = object;
```

## Properties

### body?

```ts
optional body?: IncidentResolutionRequest;
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

Key of the incident to resolve.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/incidents/{incidentKey}/resolution";
```
