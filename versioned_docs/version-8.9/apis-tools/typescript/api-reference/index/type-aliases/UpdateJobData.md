---
title: "Type Alias: UpdateJobData"
sidebar_label: "UpdateJobData"
mdx:
  format: md
---

# Type Alias: UpdateJobData

```ts
type UpdateJobData = object;
```

## Properties

### body

```ts
body: JobUpdateRequest;
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

The key of the job to update.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/jobs/{jobKey}";
```
