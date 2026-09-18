---
title: "Type Alias: WaitStateDetails"
sidebar_label: "WaitStateDetails"
mdx:
  format: md
---

# Type Alias: WaitStateDetails

```ts
type WaitStateDetails =
  | (object & JobWaitStateDetails)
  | (object & MessageWaitStateDetails)
  | (object & UserTaskWaitStateDetails)
  | (object & TimerWaitStateDetails)
  | (object & SignalWaitStateDetails)
  | (object & ConditionWaitStateDetails);
```

Wait-state-specific details of an element instance.
