---
id: feel-built-in-functions-range
title: Range functions
description: "This document outlines range functions and examples."
---

A set of functions establish relationships between single scalar values and ranges of such values.
All functions take two arguments and return `true` if the relationship between the argument holds,
or `false` otherwise.

A scalar value must be of the following type:

- number
- date
- time
- date-time
- days-time-duration
- years-months-duration

![range functions overview](../assets/feel-built-in-functions-range-overview.png)

## before(point1, point2)

**Function signature**

```feel
before(point1: Any, point2: Any): boolean
```

**Examples**

```feel
before(1, 10)
// true

before(10, 1)
// false
```

## before(range, point)

**Function signature**

```feel
before(range: range, point: Any): boolean
```

**Examples**

```feel
before([1..5], 10)
// true
```

## before(point, range)

**Function signature**

```feel
before(point: Any, range: range): boolean
```

**Examples**

```feel
before(1, [2..5])
// true
```

## before(range1, range2)

**Function signature**

```feel
before(range1: range, range2: range): boolean
```

**Examples**

```feel
before([1..5], [6..10])
// true

before([1..5),[5..10])
// true
```

## after(point1, point2)

**Function signature**

```feel
after(point1: Any, point2: Any): boolean
```

**Examples**

```feel
after(10, 1)
// true

after(1, 10)
// false
```

## after(range, point)

**Function signature**

```feel
after(range: range, point: Any): boolean
```

**Examples**

```feel
after([1..5], 10)
// false
```

## after(point, range)

**Function signature**

```feel
after(point: Any, range: range): boolean
```

**Examples**

```feel
after(12, [2..5])
// true
```

## after(range1, range2)

**Function signature**

```feel
after(range1: range, range2: range): boolean
```

**Examples**

```feel
after([6..10], [1..5])
// true

after([5..10], [1..5))
// true
```

## meets(range1, range2)

**Function signature**

```feel
meets(range1: range, range2: range): boolean
```

**Examples**

```feel
meets([1..5], [5..10])
// true

meets([1..3], [4..6])
// false

meets([1..3], [3..5])
// true

meets([1..5], (5..8])
// false

```

## met by(range1, range2)

**Function signature**

```feel
met by(range1: range, range2: range): boolean
```

**Examples**

```feel
met by([5..10], [1..5])
// true

met by([3..4], [1..2])
// false

met by([3..5], [1..3])
// true

met by((5..8], [1..5))
// false

met by([5..10], [1..5))
// false
```

## overlaps(range1, range2)

**Function signature**

```feel
overlaps(range1: range, range2: range): boolean
```

**Examples**

```feel
overlaps([5..10], [1..6])
// true

overlaps((3..7], [1..4])
// true

overlaps([1..3], (3..6])
// false

overlaps((5..8], [1..5))
// false

overlaps([4..10], [1..5))
// true
```

## overlaps before(range1, range2)

**Function signature**

```feel
overlaps before(range1: range, range2: range): boolean
```

**Examples**

```feel
overlaps before([1..5], [4..10])
// true

overlaps before([3..4], [1..2])
// false

overlaps before([1..3], (3..5])
// false

overlaps before([1..5), (3..8])
// true

overlaps before([1..5), [5..10])
// false
```

## overlaps after(range1, range2)

**Function signature**

```feel
overlaps after(range1: range, range2: range): boolean
```

**Examples**

```feel
overlaps after([4..10], [1..5])
// true

overlaps after([3..4], [1..2])
// false

overlaps after([3..5], [1..3))
// false

overlaps after((5..8], [1..5))
// false

overlaps after([4..10], [1..5))
// true
```

## finishes(point, range)

**Function signature**

```feel
finishes(point: Any, range: range): boolean
```

**Examples**

```feel
finishes(5, [1..5])
// true

finishes(10, [1..7])
// false
```

## finishes(range1, range2)

**Function signature**

```feel
finishes(range1: range, range2: range): boolean
```

**Examples**

```feel
finishes([3..5], [1..5])
// true

finishes((1..5], [1..5))
// false

finishes([5..10], [1..10))
// false
```

## finished by(range, point)

**Function signature**

```feel
finished by(range: range, point: Any): boolean
```

**Examples**

```feel
finished by([5..10], 10)
// true

finished by([3..4], 2)
// false
```

## finished by(range1, range2)

**Function signature**

```feel
finished by(range1: range, range2: range): boolean
```

**Examples**

```feel
finished by([1..5], [3..5])
// true

finished by((5..8], [1..5))
// false

finished by([5..10], (1..10))
// false
```

## includes(range, point)

**Function signature**

```feel
includes(range: range, point: Any): boolean
```

**Examples**

```feel
includes([5..10], 6)
// true

includes([3..4], 5)
// false
```

## includes(range1, range2)

**Function signature**

```feel
includes(range1: range, range2: range): boolean
```

**Examples**

```feel
includes([1..10], [4..6])
// true

includes((5..8], [1..5))
// false

includes([1..10], [1..5))
// true
```

## during(point, range)

**Function signature**

```feel
during(point: Any, range: range): boolean
```

**Examples**

```feel
during(5, [1..10])
// true

during(12, [1..10])
// false

during(1, (1..10])
// false
```

## during(range1, range2)

**Function signature**

```feel
during(range1: range, range2: range): boolean
```

**Examples**

```feel
during([4..6], [1..10))
// true

during((1..5], (1..10])
// true
```

## starts(point, range)

**Function signature**

```feel
starts(point: Any, range: range): boolean
```

**Examples**

```feel
starts(1, [1..5])
// true

starts(1, (1..8])
// false
```

## starts(range1, range2)

**Function signature**

```feel
starts(range1: range, range2: range): boolean
```

**Examples**

```feel
starts((1..5], [1..5])
// false

starts([1..10], [1..5])
// false

starts((1..5), (1..10))
// true
```

## started by(range, point)

**Function signature**

```feel
started by(range: range, point: Any): boolean
```

**Examples**

```feel
started by([1..10], 1)
// true

started by((1..10], 1)
// false
```

## started by(range1, range2)

**Function signature**

```feel
started by(range1: range, range2: range): boolean
```

**Examples**

```feel
started by([1..10], [1..5])
// true

started by((1..10], [1..5))
// false

started by([1..10], [1..10))
// true
```

## coincides(point1, point2)

**Function signature**

```feel
coincides(point1: Any, point2: Any): boolean
```

**Examples**

```feel
coincides(5, 5)
// true

coincides(3, 4)
// false
```

## coincides(range1, range2)

**Function signature**

```feel
coincides(range1: range, range2: range): boolean
```

**Examples**

```feel
coincides([1..5], [1..5])
// true

coincides((1..5], [1..5))
// false

coincides([1..5], [2..6])
// false
```
