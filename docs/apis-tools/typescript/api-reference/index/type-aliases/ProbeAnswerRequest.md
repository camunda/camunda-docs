---
title: "Type Alias: ProbeAnswerRequest"
sidebar_label: "ProbeAnswerRequest"
mdx:
  format: md
---

# Type Alias: ProbeAnswerRequest

```ts
type ProbeAnswerRequest =
  | (object & ProbeOkAnswerRequest)
  | (object & ProbeUnsupportedAnswerRequest)
  | (object & ProbeErrorAnswerRequest);
```

The answer of the worker, one of three shapes chosen by `outcome`.
