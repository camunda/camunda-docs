---
title: "Type Alias: ProbeResult"
sidebar_label: "ProbeResult"
mdx:
  format: md
---

# Type Alias: ProbeResult

```ts
type ProbeResult =
  | (object & ProbeOkResult)
  | (object & ProbeUnsupportedResult)
  | (object & ProbeErrorResult);
```

The answer of the worker, one of three shapes chosen by `outcome`.
