---
title: "Type Alias: ProbeErrorResult"
sidebar_label: "ProbeErrorResult"
mdx:
  format: md
---

# Type Alias: ProbeErrorResult

```ts
type ProbeErrorResult = object;
```

Error probe result

The worker failed to produce an answer.

## Properties

### message

```ts
message: string;
```

Why the worker failed, at most 500 characters.

---

### outcome

```ts
outcome: string;
```

The outcome of the probe, `ERROR`.

---

### worker

```ts
worker: string;
```

The name of the worker that answered.
