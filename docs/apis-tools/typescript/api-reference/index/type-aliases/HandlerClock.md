---
title: "Type Alias: HandlerClock"
sidebar_label: "HandlerClock"
mdx:
  format: md
---

# Type Alias: HandlerClock

```ts
type HandlerClock = Pick<Clock, "now" | "sleep">;
```

The slice of the clock handed to job handlers.

Deliberately narrower than `Clock`: `deadline` is a liveness primitive, and a handler that
built one against a pinned clock would hang rather than time out. Handlers get to read time
and to wait, nothing else.

`sleep` is for short in-handler coordination — backing off around a flaky dependency,
spacing retries within one job. Long or business-meaningful waits belong in the process as
BPMN timers, where they survive a crash and are visible to operations.
