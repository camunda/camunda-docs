---
title: "Type Alias: RestoreData"
sidebar_label: "RestoreData"
mdx:
  format: md
---

# Type Alias: RestoreData

```ts
type RestoreData = object;
```

## Properties

### body

```ts
body: RestoreRequest;
```

---

### path?

```ts
optional path?: never;
```

---

### query?

```ts
optional query?: object;
```

#### dryRun?

```ts
optional dryRun?: boolean;
```

If true, the requested change is only validated and the resulting plan is returned, without applying it to the cluster.

---

### url

```ts
url: "/restore";
```
