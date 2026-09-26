---
title: "Type Alias: TimerWaitStateDetails"
sidebar_label: "TimerWaitStateDetails"
mdx:
  format: md
---

# Type Alias: TimerWaitStateDetails

```ts
type TimerWaitStateDetails = BaseWaitStateDetails & object;
```

## Type Declaration

### dueDate

```ts
dueDate: number | null;
```

When the timer is due, as a UNIX epoch timestamp in milliseconds.

### repetitions

```ts
repetitions: number | null;
```

The number of remaining timer repetitions (-1 for infinite, 0 for non-repeating).

### waitStateType

```ts
waitStateType: string;
```

The wait state type discriminator.
