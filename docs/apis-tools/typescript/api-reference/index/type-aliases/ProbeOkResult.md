---
title: "Type Alias: ProbeOkResult"
sidebar_label: "ProbeOkResult"
mdx:
  format: md
---

# Type Alias: ProbeOkResult

```ts
type ProbeOkResult = object;
```

OK probe result

The worker produced an answer.

## Properties

### data

```ts
data: object;
```

The answer, whose shape the worker of the probe ID defines.

#### Index Signature

```ts
[key: string]: unknown
```

---

### outcome

```ts
outcome: string;
```

The outcome of the probe, `OK`.

---

### worker

```ts
worker: string;
```

The name of the worker that answered.
