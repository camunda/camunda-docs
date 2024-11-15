---
id: feel-list-expressions
title: List expressions
description: "Learn more about how you can use FEEL list expressions, including examples that show common use cases for FEEL list expressions."
---

You can use the following FEEL list expressions. Examples are provided to show common use cases.

### Literal

Creates a new list of the given elements. The elements can be of any type.

```feel
[1,2,3,4]
```

A list value can embed other list values.

```feel
[[1,2], [3,4], [5,6]]
```

### Get element

```feel
a[i]
```

Accesses an element of the list `a` at index `i`. The index starts at `1`.

If the index is out of the range of the list, it returns `null`.

```feel
[1,2,3,4][1]
// 1

[1,2,3,4][2]
// 2

[1,2,3,4][4]
// 4

[1,2,3,4][5]
// null

[1,2,3,4][0]
// null
```

If the index is negative, it starts counting the elements from the end of the list. The last element of the list is at index `-1`.

```feel
[1,2,3,4][-1]
// 4

[1,2,3,4][-2]
// 3

[1,2,3,4][-5]
// null
```

:::caution be careful!
The index of a list starts at `1`. In other languages, the index starts at `0`.
:::

### Filter

```feel
a[c]
```

Filters the list `a` by the condition `c`. The result of the expression is a list that contains all elements where the condition `c` evaluates to `true`. The other elements are excluded.

While filtering, the current element is assigned to the variable `item`.

```feel
[1,2,3,4][item > 2]
// [3,4]

[1,2,3,4][item > 10]
// []

[1,2,3,4][even(item)]
// [2,4]
```

### Some

```feel
some a in b satisfies c
```

Iterates over the list `b` and evaluate the condition `c` for each element in the list. The current
element is assigned to the variable `a`.

It returns `true` if `c` evaluates to `true` for **one or more** elements of `b`. Otherwise, it
returns `false`.

```feel
some x in [1,2,3] satisfies x > 2
// true

some x in [1,2,3] satisfies x > 5
// false

some x in [1,2,3] satisfies even(x)
// true

some x in [1,2], y in [2,3] satisfies x < y
// true
```

### Every

Iterates over the list `b` and evaluate the condition `c` for each element in the list. The current
element is assigned to the variable `a`.

It returns `true` if `c` evaluates to `true` for **all** elements of `b`. Otherwise, it
returns `false`.

```feel
every x in [1,2,3] satisfies x >= 1
// true

every x in [1,2,3] satisfies x >= 2
// false

every x in [1,2,3] satisfies even(x)
// false

every x in [1,2], y in [2,3] satisfies x < y
// false
```

## Examples

### Filter list and return the first element

Return the first packaging element which unit is "Palette".

```feel
data.attribute.packaging[unit = "Palette"][1]
```

### Group list

Group the given list of invoices by their person.

Each invoice has a person. The persons are extracted from the invoices and are used as a filter for the list.

```feel
for p in distinct values(invoices.person) return invoices[person = p]
```

#### Evaluation context

```feel
{"invoices":[
  {"id":1, "person":"A", "amount": 10},
  {"id":2, "person":"A", "amount": 20},
  {"id":3, "person":"A", "amount": 30},
  {"id":4, "person":"A", "amount": 40},
  {"id":5, "person":"B", "amount": 15},
  {"id":6, "person":"B", "amount": 25}
]}
```

#### Evaluation result

```feel
[
  [
    { id: 1, person: "A", amount: 10 },
    { id: 2, person: "A", amount: 20 },
    { id: 3, person: "A", amount: 30 },
    { id: 4, person: "A", amount: 40 },
  ],
  [
    { id: 5, person: "B", amount: 15 },
    { id: 6, person: "B", amount: 25 },
  ],
]
```

### Merge two lists

Merge two given lists. Each list contains context values with the same structure. Each context has an `id` entry that identifies the value.

The result is a list that contains all context values grouped by the identifier.

```feel
 {
   ids: union(x.files.id,y.files.id),
   getById: function (files,fileId) get or else(files[id=fileId][1], {}),
   merge: for id in ids return context merge(getById(x.files, id), getById(y.files, id))
 }.merge
```

#### Evaluation context

```feel
{
 "x": {"files": [
   {"id":1, "content":"a"},
   {"id":2, "content":"b"}
 ]},
 "y": {"files": [
   {"id":1, "content":"a2"},
   {"id":3, "content":"c"}
 ]}
}
```

#### Evaluation result

```feel
[
  { id: 1, content: "a2" },
  { id: 2, content: "b" },
  { id: 3, content: "c" },
]
```
