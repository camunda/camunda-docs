---
id: feel-context-expressions
title: Context expressions
description: "Learn more about how you can use FEEL context expressions, including examples that show common use cases for FEEL context expressions."
---

You can use the following FEEL context expressions. Examples are provided to show common use cases.

### Literal

Creates a new context with the given entries.

- Each entry has a key and a value.
- The key is either a name or a string.
- The value can be any type.

:::info
For valid key names, see [naming conventions](./feel-variables.md#variable-names).
:::

```feel
{
  a: 1,
  b: 2
}
// {a:1, b:2}

{
  "a": 1,
  "b": 2
}
// {a:1, b:2}
```

Inside the context, the previous entries can be accessed.

```feel
{
  a: 2,
  b: a * 2
}
// {a:2, b:4}
```

A context value can embed other context values.

```feel
{
  a: 1,
  b: {
    c: 2
  }
}
// {a:1, b:{c:2}}
```

### Get entry/path

```feel
a.b
```

Accesses the entry with the key `b` of the context `a`. The path is separated by a dot `.`.

If the value of the entry `b` is also a context, the path can be chained (i.e. `a.b.c`).

```feel
{a: 2}.a
// 2

{a: {b: 3}}.a
// {b: 3}

{a: {b: 3}}.a.b
// 3
```

If the context `a` doesn't contain an entry with the key `b`, the expression returns `null`.

```feel
{a: 1}.b
// null

{a: 1}.b.c
// null
```

### Filter

```feel
a[c]
```

Filters the list of context elements `a` by the condition `c`. The result of the expression is a
list that contains all elements where the condition `c` evaluates to `true`. The other elements are
excluded.

While filtering, the current element is assigned to the variable `item` and its entries can be
accessed by their key.

```feel
[
  {
    a: "p1",
    b: 5
  },
  {
    a: "p2",
    b: 10
  }
][b > 7]
// [{a: "p2", b: 10}]
```

### Projection

```feel
a.b
```

Extracts the entries with the key `b` of the list of context elements `a` (that is, a projection). It returns a list containing the values of the context elements with the key `b`.

```feel
[
  {
    a: "p1",
    b: 5
  },
  {
    a: "p2",
    b: 10
  }
].a
// ["p1", "p2"]
```

If an element of the list `a` doesn't contain an entry with the key `b`, the result contains `null` of this element.

```feel
[
  {
    a: "p1",
    b: 5
  },
  {
    a: "p2",
    c: 20
  }
].b
// [5, null]
```

## Examples

### Validate data

Validate journal entries and return all violations.

```feel
{
  check1: {
    error: "Document Type invalid for current year posting",
    violations: collection[documentType = "S2" and glDate > startFiscalYear]
  },
  check2: {
    error: "Document Type invalid for current year posting",
    violations: collection[ledgerType = "GP" and foreignAmount != null]
  },
  result: [check1, check2][count(violations) > 0]
}
```

### Structure calculation

Calculate the minimum age of a given list of birthdays.

```feel
{
  age: function(birthday) (today() - birthday).years,
  ages: for birthday in birthdays return age(birthday),
  minAge: min(ages)
}.minAge
```
