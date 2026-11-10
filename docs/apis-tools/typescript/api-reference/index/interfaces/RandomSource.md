---
title: "Interface: RandomSource"
sidebar_label: "RandomSource"
mdx:
  format: md
---

# Interface: RandomSource

The randomness all SDK runtime jitter resolves through — HTTP retry backoff, OAuth retry
backoff, eventual-consistency 429 backoff, activation-retry backoff and worker startup
staggering.

The randomness counterpart of `Clock`: pinning the clock makes cadence virtual,
injecting a [SeededRandom](SeededRandom.md) as well makes it reproducible. See the cross-SDK contract
in camunda/sdk-infra#50.

## Extended by

- [`SeededRandom`](SeededRandom.md)

## Methods

### next()

```ts
next(): number;
```

A uniformly distributed value in `[0, 1)`.

#### Returns

`number`
