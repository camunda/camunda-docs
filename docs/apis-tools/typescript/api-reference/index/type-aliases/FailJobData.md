---
title: "Type Alias: FailJobData"
sidebar_label: "FailJobData"
mdx:
  format: md
---

# Type Alias: FailJobData

```ts
type FailJobData = object;
```

## Properties

### body?

```ts
body?: JobFailRequest;
```

---

### path

```ts
path: object;
```

#### jobKey

```ts
jobKey: JobKeyWritable;
```

The key of the job to fail.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/jobs/{jobKey}/failure";
```
