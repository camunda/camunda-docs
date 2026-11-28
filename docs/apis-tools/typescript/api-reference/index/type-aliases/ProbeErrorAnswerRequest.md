---
title: "Type Alias: ProbeErrorAnswerRequest"
sidebar_label: "ProbeErrorAnswerRequest"
mdx:
  format: md
---

# Type Alias: ProbeErrorAnswerRequest

```ts
type ProbeErrorAnswerRequest = object;
```

Error probe answer

The worker failed to produce an answer.

## Properties

### message

```ts
message: string;
```

Why the worker failed, 1 to 500 characters.

---

### outcome

```ts
outcome: string;
```

The outcome of the probe, `ERROR`.
