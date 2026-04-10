---
title: "Type Alias: CompleteJobData"
sidebar_label: "CompleteJobData"
mdx:
  format: md
---

# Type Alias: CompleteJobData

```ts
type CompleteJobData = object;
```

## Properties

### body?

```ts
optional body?: JobCompletionRequest;
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

The key of the job to complete.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/jobs/{jobKey}/completion";
```
