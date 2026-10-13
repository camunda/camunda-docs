---
title: "Function: createTestClock()"
sidebar_label: "createTestClock()"
mdx:
  format: md
---

# Function: createTestClock()

```ts
function createTestClock(options?): TestClock;
```

A deterministic clock for tests: virtual time, so poll loops and backoff settle without
burning real time.

Exists so nobody hand-rolls one. Every ad-hoc clock this replaced got some clause of the
contract wrong — most often settling `sleep` in a microtask, which spins any caller that
reschedules itself on resolution. See #478.

With `autoAdvance` (the default) a sleep settles itself on the next macrotask, having
moved time to its wake point; the SDK's loops make progress without the test driving
them. Set it to `false` to hold every sleep until `advance()` releases it, which is what
you want when asserting on the state _between_ two waits.

## Parameters

### options?

#### autoAdvance?

`boolean`

#### start?

`number`

## Returns

[`TestClock`](../interfaces/TestClock.md)
