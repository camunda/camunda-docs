---
title: "Type Alias: AnswerProbeData"
sidebar_label: "AnswerProbeData"
mdx:
  format: md
---

# Type Alias: AnswerProbeData

```ts
type AnswerProbeData = object;
```

## Properties

### body

```ts
body: ProbeAnswerRequest;
```

---

### path

```ts
path: object;
```

#### probeKey

```ts
probeKey: ProbeKeyWritable;
```

The key of the probe to answer.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/probes/{probeKey}/answer";
```
