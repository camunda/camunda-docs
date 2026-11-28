---
title: "Type Alias: ProbeOkAnswerRequest"
sidebar_label: "ProbeOkAnswerRequest"
mdx:
  format: md
---

# Type Alias: ProbeOkAnswerRequest

```ts
type ProbeOkAnswerRequest = object;
```

OK probe answer

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
