---
title: "Type Alias: ThrowJobErrorData"
sidebar_label: "ThrowJobErrorData"
mdx:
  format: md
---

# Type Alias: ThrowJobErrorData

```ts
type ThrowJobErrorData = object;
```

## Properties

### body

```ts
body: JobErrorRequest;
```

---

### path

```ts
path: object;
```

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/jobs/{jobKey}/error";
```
