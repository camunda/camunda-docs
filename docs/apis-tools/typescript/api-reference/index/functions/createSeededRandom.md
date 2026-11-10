---
title: "Function: createSeededRandom()"
sidebar_label: "createSeededRandom()"
mdx:
  format: md
---

# Function: createSeededRandom()

```ts
function createSeededRandom(seed): SeededRandom;
```

A deterministic source for tests: the same seed yields the same draws on every run, and in
every Camunda SDK.

SplitMix64, taking the top 53 bits of each output. Specified by the cross-SDK contract rather
than borrowed from the platform, so a seed reproduces the same jitter in any SDK.

## Parameters

### seed

`number` \| `bigint`

## Returns

[`SeededRandom`](../interfaces/SeededRandom.md)
