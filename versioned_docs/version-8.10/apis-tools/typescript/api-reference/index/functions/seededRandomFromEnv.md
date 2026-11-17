---
title: "Function: seededRandomFromEnv()"
sidebar_label: "seededRandomFromEnv()"
mdx:
  format: md
---

# Function: seededRandomFromEnv()

```ts
function seededRandomFromEnv(env?): SeededRandom;
```

A [SeededRandom](../interfaces/SeededRandom.md) seeded from `CAMUNDA_TEST_SEED` when it is set, otherwise from a
fresh random seed. Report its seed on failure, and set the variable to it to replay the run.

Only an unset variable means "absent": any other value that is not an unsigned 64-bit
decimal integer throws rather than silently replacing the seed being replayed.

## Parameters

### env?

`Record`\<`string`, `string` \| `undefined`\> = `...`

## Returns

[`SeededRandom`](../interfaces/SeededRandom.md)
