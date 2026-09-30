---
title: "Function: createLiveClock()"
sidebar_label: "createLiveClock()"
mdx:
  format: md
---

# Function: createLiveClock()

```ts
function createLiveClock(source?): Clock;
```

The live clock: the platform clock, made non-decreasing and self-correcting.

This is the single place the SDK runtime is allowed to read ambient time or use a
platform timer. Everything else takes a `Clock`.

Ruling 2a requires three properties together, and the C# pilot shipped three
implementations that each satisfied only two:

- **Never decreases.** Wall clocks step backwards (NTP correction, VM resume, manual
  change), and a deadline measured across a backward step waits longer than asked.
- **Keeps advancing immediately after a step.** Clamping to a high-water mark satisfies
  the first property but freezes logical time for the _whole_ duration of the
  correction, so an hour-long step adds an hour to every deadline in flight — the very
  damage the rule exists to prevent.
- **Converges back.** Absorbing the step into a permanent offset satisfies the first two
  but leaves reported time ahead of true time forever, so any comparison against a
  server-supplied absolute time is wrong for the life of the process.

A backward step is therefore absorbed and then repaid gradually out of forward
progress, the way NTP slews rather than steps.

## Parameters

### source?

() => `number`

injectable purely so the slew behaviour itself is testable; production
callers use the default. Called through rather than captured, so a test that swaps the
global `Date` (fake timers) still drives the shared `liveClock`.

## Returns

[`Clock`](../interfaces/Clock.md)
