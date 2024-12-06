---
id: feel-built-in-functions-list
title: List functions
description: "This document outlines built-in list functions and examples."
---

import MarkerCamundaExtension from "@site/src/mdx/MarkerCamundaExtension";

## list contains(list, element)

Returns `true` if the given list contains the element. Otherwise, returns `false`.

**Function signature**

```feel
list contains(list: list, element: Any): boolean
```

**Examples**

```feel
list contains([1,2,3], 2)
// true
```

## count(list)

Returns the number of elements of the given list.

**Function signature**

```feel
count(list: list): number
```

**Examples**

```feel
count([1,2,3])
// 3
```

## min(list)

Returns the minimum of the given list.

**Function signature**

```feel
min(list: list): Any
```

All elements in `list` should have the same type and be comparable.

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
min([1,2,3])
// 1

min(1,2,3)
// 1
```

## max(list)

Returns the maximum of the given list.

**Function signature**

```feel
max(list: list): Any
```

All elements in `list` should have the same type and be comparable.

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
max([1,2,3])
// 3

max(1,2,3)
// 3
```

## sum(list)

Returns the sum of the given list of numbers.

**Function signature**

```feel
sum(list: list<number>): number
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
sum([1,2,3])
// 6

sum(1,2,3)
// 6
```

## product(list)

Returns the product of the given list of numbers.

**Function signature**

```feel
product(list: list<number>): number
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
product([2, 3, 4])
// 24

product(2, 3, 4)
// 24
```

## mean(list)

Returns the arithmetic mean (i.e. average) of the given list of numbers.

**Function signature**

```feel
mean(list: list<number>): number
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
mean([1,2,3])
// 2

mean(1,2,3)
// 2
```

## median(list)

Returns the median element of the given list of numbers.

**Function signature**

```feel
median(list: list<number>): number
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
median(8, 2, 5, 3, 4)
// 4

median([6, 1, 2, 3])
// 2.5
```

## stddev(list)

Returns the standard deviation of the given list of numbers.

**Function signature**

```feel
stddev(list: list<number>): number
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
stddev(2, 4, 7, 5)
// 2.0816659994661326

stddev([2, 4, 7, 5])
// 2.0816659994661326
```

## mode(list)

Returns the mode of the given list of numbers.

**Function signature**

```feel
mode(list: list<number>): number
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
mode(6, 3, 9, 6, 6)
// [6]

mode([6, 1, 9, 6, 1])
// [1, 6]
```

## all(list)

Returns `false` if any element of the given list is `false`. Otherwise, returns `true`.

If the given list is empty, it returns `true`.

**Function signature**

```feel
all(list: list<boolean>): boolean
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
all([true,false])
// false

all(false,null,true)
// false
```

:::info
The function `all()` replaced the previous function `and()`. The previous function is deprecated and
should not be used anymore.
:::

## any(list)

Returns `true` if any element of the given list is `true`. Otherwise, returns `false`.

If the given list is empty, it returns `false`.

**Function signature**

```feel
any(list: list<boolean>): boolean
```

The parameter `list` can be passed as a list or as a sequence of elements.

**Examples**

```feel
any([false,true])
// true

any(false,null,true)
// true
```

:::info
The function `any()` replaced the previous function `or()`. The previous function is deprecated and
should not be used anymore.
:::

## sublist(list, start position)

Returns a partial list of the given value starting at `start position`.

**Function signature**

```feel
sublist(list: list, start position: number): list
```

The `start position` starts at the index `1`. The last position is `-1`.

**Examples**

```feel
sublist([1,2,3], 2)
// [2,3]
```

## sublist(list, start position, length)

Returns a partial list of the given value starting at `start position`.

**Function signature**

```feel
sublist(list: list, start position: number, length: number): list
```

The `start position` starts at the index `1`. The last position is `-1`.

**Examples**

```feel
sublist([1,2,3], 1, 2)
// [1,2]
```

## append(list, items)

Returns the given list with all `items` appended.

**Function signature**

```feel
append(list: list, items: Any): list
```

The parameter `items` can be a single element or a sequence of elements.

**Examples**

```feel
append([1], 2, 3)
// [1,2,3]
```

## concatenate(lists)

Returns a list that includes all elements of the given lists.

**Function signature**

```feel
concatenate(lists: list): list
```

The parameter `lists` is a sequence of lists.

**Examples**

```feel
concatenate([1,2],[3])
// [1,2,3]

concatenate([1],[2],[3])
// [1,2,3]
```

## insert before(list, position, newItem)

Returns the given list with `newItem` inserted at `position`.

**Function signature**

```feel
insert before(list: list, position: number, newItem: Any): list
```

The `position` starts at the index `1`. The last position is `-1`.

**Examples**

```feel
insert before([1,3],1,2)
// [2,1,3]
```

## remove(list, position)

Returns the given list without the element at `position`.

**Function signature**

```feel
remove(list: list, position: number): list
```

The `position` starts at the index `1`. The last position is `-1`.

**Examples**

```feel
remove([1,2,3], 2)
// [1,3]
```

## reverse(list)

Returns the given list in revered order.

**Function signature**

```feel
reverse(list: list): list
```

**Examples**

```feel
reverse([1,2,3])
// [3,2,1]
```

## index of(list, match)

Returns an ascending list of positions containing `match`.

**Function signature**

```feel
index of(list: list, match: Any): list<number>
```

**Examples**

```feel
index of([1,2,3,2],2)
// [2,4]
```

## union(list)

Returns a list that includes all elements of the given lists without duplicates.

**Function signature**

```feel
union(list: list): list
```

The parameter `list` is a sequence of lists.

**Examples**

```feel
union([1,2],[2,3])
// [1,2,3]
```

## distinct values(list)

Returns the given list without duplicates.

**Function signature**

```feel
distinct values(list: list): list
```

**Examples**

```feel
distinct values([1,2,3,2,1])
// [1,2,3]
```

## duplicate values(list)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns all duplicate values of the given list.

**Function signature**

```feel
duplicate values(list: list): list
```

**Examples**

```feel
duplicate values([1,2,3,2,1])
// [1,2]
```

## flatten(list)

Returns a list that includes all elements of the given list without nested lists.

**Function signature**

```feel
flatten(list: list): list
```

**Examples**

```feel
flatten([[1,2],[[3]], 4])
// [1,2,3,4]
```

## sort(list, precedes)

Returns the given list sorted by the `precedes` function.

**Function signature**

```feel
sort(list: list, precedes: function<(Any, Any) -> boolean>): list
```

**Examples**

```feel
sort(list: [3,1,4,5,2], precedes: function(x,y) x < y)
// [1,2,3,4,5]
```

## string join(list)

Joins a list of strings into a single string. This is similar to
Java's [joining](<https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)>)
function.

If an item of the list is `null`, the item is ignored for the result string. If an item is
neither a string nor `null`, the function returns `null` instead of a string.

**Function signature**

```feel
string join(list: list<string>): string
```

**Examples**

```feel
string join(["a","b","c"])
// "abc"

string join(["a",null,"c"])
// "ac"

string join([])
// ""
```

## string join(list, delimiter)

Joins a list of strings into a single string. This is similar to
Java's [joining](<https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)>)
function.

If an item of the list is `null`, the item is ignored for the result string. If an item is
neither a string nor `null`, the function returns `null` instead of a string.

The resulting string contains a `delimiter` between each element.

**Function signature**

```feel
string join(list: list<string>, delimiter: string): string
```

**Examples**

```feel
string join(["a"], "X")
// "a"

string join(["a","b","c"], ", ")
// "a, b, c"
```

## string join(list, delimiter, prefix, suffix)

<MarkerCamundaExtension></MarkerCamundaExtension>

Joins a list of strings into a single string. This is similar to
Java's [joining](<https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)>)
function.

If an item of the list is `null`, the item is ignored for the result string. If an item is
neither a string nor `null`, the function returns `null` instead of a string.

The resulting string starts with `prefix`, contains a `delimiter` between each element, and ends
with `suffix`.

**Function signature**

```feel
string join(list: list<string>, delimiter: string, prefix: string, suffix: string): string
```

**Examples**

```feel
string join(["a","b","c"], ", ", "[", "]")
// "[a, b, c]"
```

## is empty(list)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns `true` if the given list is empty. Otherwise, returns `false`.

**Function signature**

```feel
is empty(list: list): boolean
```

**Examples**

```feel
is empty([])
// true

is empty([1,2,3])
// false
```

## partition(list， size)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns consecutive sublists of a list, each of the same size (the final list may be smaller).

If `size` is less than `0`, it returns `null`.

**Function signature**

```feel
partition(list: list, size: number): list
```

**Examples**

```feel
partition([1,2,3,4,5], 2)
// [[1,2], [3,4], [5]]

partition([], 2)
// []

partition([1,2], 0)
// null
```
