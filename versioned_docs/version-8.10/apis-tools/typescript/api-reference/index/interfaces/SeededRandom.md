---
title: "Interface: SeededRandom"
sidebar_label: "SeededRandom"
mdx:
  format: md
---

# Interface: SeededRandom

A deterministic [RandomSource](RandomSource.md); report [SeededRandom.seed](#seed) on failure.

## Extends

- [`RandomSource`](RandomSource.md)

## Properties

### seed

```ts
readonly seed: bigint;
```

## Methods

### next()

```ts
next(): number;
```

A uniformly distributed value in `[0, 1)`.

#### Returns

`number`

#### Inherited from

[`RandomSource`](RandomSource.md).[`next`](RandomSource.md#next)

---

### toString()

```ts
toString(): string;
```

Names the seed and how to replay it, for failure messages.

#### Returns

`string`
