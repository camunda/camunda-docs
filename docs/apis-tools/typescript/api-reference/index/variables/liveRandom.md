---
title: "Variable: liveRandom"
sidebar_label: "liveRandom"
mdx:
  format: md
---

# Variable: liveRandom

```ts
const liveRandom: RandomSource;
```

The live source: the platform generator. Production jitter stays random so a fleet of
workers does not retry or start in lockstep.

This is the single place the SDK runtime is allowed to read ambient randomness.
