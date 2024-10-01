---
id: feel-unary-tests
title: Unary-tests
description: "This document outlines unary-tests and examples."
---

A unary-tests expression is a special kind of boolean expression. Unary-tests expressions should be used for the input
entries of a decision table (i.e. the conditions of a rule).

A unary-tests expression returns `true` if one of the following conditions is fulfilled:

- The expression evaluates to `true` when the input value is applied to the unary operators.
- The expression evaluates to `true` when the input value is assigned to the special variable `?`.
- The expression evaluates to a value, and the input value is equal to that value.
- The expression evaluates to a list, and the input value is equal to at least one of the values.
- The expression is equal to `-` (a dash).

### Comparison

Compares the input value with a given value. The input value is passed implicitly as the first
argument of the operator.

Both values must be of the same type. Otherwise, the result is `null`.

<table>
  <tr>
    <th>Operator</th>
    <th>Description</th>
    <th>Supported types</th>
  </tr>

  <tr>
    <td>(none)</td>
    <td>equal to</td>
    <td>any</td>
  </tr>

  <tr>
    <td>&lt;</td>
    <td>less than</td>
    <td>number, date, time, date-time, duration</td>
  </tr>

  <tr>
    <td>&lt;=</td>
    <td>less than or equal to</td>
    <td>number, date, time, date-time, duration</td>
  </tr>

  <tr>
    <td>&gt;</td>
    <td>greater than</td>
    <td>number, date, time, date-time, duration</td>
  </tr>

  <tr>
    <td>&gt;=</td>
    <td>greater than or equal</td>
    <td>number, date, time, date-time, duration</td>
  </tr>

</table>

```feel
"valid"

< 10

<= date("2020-04-06")

> time("08:00:00")

>= duration("P5D")
```

### Interval

Checks if the input value is within a given interval between `x` and `y`.

An interval has two boundaries that can be open `(x..y)` / `]x..y[` or closed `[x..y]`. If a
boundary is closed, it includes the given value (i.e. less/greater than or equal). Otherwise, it
excludes the value (i.e. less/greater than).

The input value is passed implicitly to the operator.

```feel
(2..5)
// input > 2 and input < 5

]2..5[
// input > 2 and input < 5

[2..5]
// input >= 2 and input <= 5

(2..5]
// input > 2 and input <= 5
```

### Disjunction/or

Combines multiple unary-test expressions following the ternary logic.

- Returns `true` if at least one unary-test evaluates to `true`.
- Otherwise, it returns `false`.

```feel
2, 3, 4
// input = 2 or input = 3 or input = 4

< 10, > 50
// input < 10 or input > 50
```

### Negation/not

Negates a given unary-test expression. The expression can be a comparison, an interval, or a
disjunction.

It returns `true` if the given unary-test evaluates to `false`.

```feel
not("valid")
// input != "valid"

not(2, 3)
// input != 2 and input != 3
```

### Expressions

When a unary operator is not enough to express the condition, any expression that returns a boolean value can be used,
such as [invoking a function](/components/modeler/feel/language-guide/feel-functions.md#invocation).

In the expression, the input value can be accessed by the special variable `?`.

```feel
contains(?, "good")
// checks if the input value (string) contains "good"

ends with(?, "@camunda.com")
// checks if the input value (string) ends with "@camunda.com"
```
