---
title: "Function: createEngineClock()"
sidebar_label: "createEngineClock()"
mdx:
  format: md
---

# Function: createEngineClock()

```ts
function createEngineClock(target, options?): EngineClock;
```

A clock bound to the engine's own clock, so client cadence and engine time advance
together.

This is the point of the whole exercise. The engine has been pinnable for a long time
(`PUT /clock`), but the SDK's poll loops ran on the platform timer, so the two were
decoupled: you could pin the engine and the worker would still poll on real time. A worker
waiting on something that never becomes ready burned real seconds inside a test that was
otherwise deterministic.

Here `sleep` does not wait — it moves the engine forward by the requested duration and
returns. A poll loop therefore _drives_ engine time rather than racing it, and a test that
would have taken a real minute finishes as fast as the requests complete.

Intended for tests and embedded scenarios that own the engine. Pinning is global to the
cluster, so never point one of these at an environment shared with anything else.

`target` must be a client that is _not_ itself configured with this clock. The client's
HTTP retry sleeps on its injected clock, so a self-referential setup would have a failed
`pinClock` back off through `sleep`, which issues another `pinClock`, and so on.

## Parameters

### target

[`EngineClockTarget`](../interfaces/EngineClockTarget.md)

### options?

#### start?

`number`

## Returns

[`EngineClock`](../interfaces/EngineClock.md)
