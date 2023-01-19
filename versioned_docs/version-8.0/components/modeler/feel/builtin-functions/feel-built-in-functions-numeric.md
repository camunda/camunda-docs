---
id: feel-built-in-functions-numeric
title: Numeric functions
description: "This document outlines built-in numeric functions and examples."
---

## decimal()

Round the given number at the given scale using the given rounding mode. If no rounding mode is passed in, it uses `HALF_EVEN` as default.

- parameters:
  - `n`: number
  - `scale`: number
  - (optional) `mode`: string - one of `UP, DOWN, CEILING, FLOOR, HALF_UP, HALF_DOWN, HALF_EVEN, UNNECESSARY` (default: `HALF_EVEN`)
- result: number

```feel
decimal(1/3, 2)
// .33

decimal(1.5, 0)
// 2

decimal(2.5, 0, "half_up")
// 3
```

## floor()

- parameters:
  - `n`: number
- result: number

```feel
floor(1.5)
// 1

floor(-1.5)
// -2
```

## ceiling()

Round the given number at the given scale using the ceiling rounding mode.

- parameters:
  - `n`: number
- result: number

```feel
ceiling(1.5)
// 2

ceiling(-1.5)
// -1
```

## abs()

Returns the absolute value of the given numeric value.

- parameters:
  - `number`: number
- result: number

```feel
abs(10)
// 10

abs(-10)
// 10
```

## modulo()

Returns the remainder of the division of dividend by divisor.

- parameters:
  - `dividend`: number
  - `divisor`: number
- result: number

```feel
modulo(12, 5)
// 2
```

## sqrt()

Returns the square root.

- parameters:
  - `number`: number
- result: number

```feel
sqrt(16)
// 4
```

## log()

Returns the natural logarithm (base e) of the number.

- parameters:
  - `number`: number
- result: number

```feel
log(10)
// 2.302585092994046
```

## exp()

Returns the Euler’s number e raised to the power of number .

- parameters:
  - `number`: number
- result: number

```feel
exp(5)
// 148.4131591025766
```

## odd()

Returns `true` if the given numeric value is odd. Otherwise, it returns `false`.

- parameters:
  - `number`: number
- result: boolean

```feel
odd(5)
// true

odd(2)
// false
```

## even()

Returns `true` if the given numeric value is even. Otherwise, it returns `false`.

- parameters:
  - `number`: number
- result: boolean

```feel
even(5)
// false

even(2)
// true
```
