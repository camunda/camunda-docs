---
title: "Interface: TestClock"
sidebar_label: "TestClock"
mdx:
  format: md
---

# Interface: TestClock

A `Clock` whose time only moves when the test says so, plus the counters a test needs to
assert on. Everything beyond `Clock` is inspection or control, never behaviour the SDK
depends on.

## Extends

- [`Clock`](Clock.md)

## Properties

### nowCalls

```ts
readonly nowCalls: number;
```

How many times `now` has been read.

---

### pending

```ts
readonly pending: number;
```

Sleeps still waiting for time to advance.

---

### sleeps

```ts
readonly sleeps: readonly number[];
```

Durations passed to `sleep`, in call order.

## Methods

### advance()

```ts
advance(ms): Promise<void>;
```

Move time forward by `ms`, settling every sleep that comes due, then drain the queue.

#### Parameters

##### ms

`number`

#### Returns

`Promise`\<`void`\>

---

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

#### Inherited from

[`Clock`](Clock.md).[`deadline`](Clock.md#deadline)

---

### now()

```ts
now(): number;
```

Current wall-clock time in epoch milliseconds.

#### Returns

`number`

#### Inherited from

[`Clock`](Clock.md).[`now`](Clock.md#now)

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

#### Inherited from

[`Clock`](Clock.md).[`sleep`](Clock.md#sleep)
