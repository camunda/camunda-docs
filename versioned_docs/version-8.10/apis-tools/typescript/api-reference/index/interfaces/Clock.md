---
title: "Interface: Clock"
sidebar_label: "Clock"
mdx:
  format: md
---

# Interface: Clock

The clock all SDK runtime cadence resolves through — worker poll loops, eventual
consistency polling, retry backoff, backpressure decay and auth refresh.

Pinning this pins the client's own timing, which is what makes those loops testable
without waiting for real time. See the cross-SDK contract in
camunda/orchestration-cluster-api-js#450.

Generalises the two seams that already existed: `CollectClock` in `typedVariables.ts`
and the injected `now`/`sleep` on `BackpressureManager`.

## Extended by

- [`EngineClock`](EngineClock.md)
- [`TestClock`](TestClock.md)

## Methods

### deadline()

```ts
deadline(ms): object;
```

A signal that aborts once `ms` have elapsed on this clock.

`dispose()` releases the underlying timer; call it when the guarded work finishes
early, or a long deadline keeps a handle alive for its full duration.

#### Parameters

##### ms

`number`

#### Returns

`object`

##### dispose

```ts
dispose: () => void;
```

###### Returns

`void`

##### signal

```ts
signal: AbortSignal;
```

---

### now()

```ts
now(): number;
```

Current wall-clock time in epoch milliseconds.

#### Returns

`number`

---

### sleep()

```ts
sleep(ms, signal?): Promise<void>;
```

Resolve after `ms` have elapsed on this clock.

Rejects with the signal's reason if `signal` aborts first, so a caller can cancel a
wait without leaving the timer behind.

An injected implementation must not resolve synchronously. The worker schedules its
next poll by awaiting this, so a sleep that settles in a microtask turns the poll loop
into an unbounded spin that starves the event loop and exhausts the heap. A test clock
should resolve only when the test advances it.

#### Parameters

##### ms

`number`

##### signal?

`AbortSignal`

#### Returns

`Promise`\<`void`\>
