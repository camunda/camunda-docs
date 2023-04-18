---
id: feel-built-in-functions-string
title: String functions
description: "This document outlines built-in string functions and examples."
---

import MarkerCamundaExtension from "@site/src/mdx/MarkerCamundaExtension";

## substring()

- parameters:
  - `string`: string
  - `start position`: number
  - (optional) `length`: number
- result: string

```feel
substring("foobar",3)
// "obar"

substring("foobar",3,3)
// "oba"
```

## string length()

- parameters:
  - `string`: string
- result: number

```feel
string length("foo")
// 3
```

## upper case()

- parameters:
  - `string`: string
- result: string

```feel
upper case("aBc4")
// "ABC4"
```

## lower case()

- parameters:
  - `string`: string
- result: string

```feel
lower case("aBc4")
// "abc4"
```

## substring before()

- parameters:
  - `string`: string
  - `match`: string
- result: string

```feel
substring before("foobar", "bar")
// "foo"
```

## substring after()

- parameters:
  - `string`: string
  - `match`: string
- result: string

```feel
substring after("foobar", "ob")
// "ar"
```

## contains()

- parameters:
  - `string`: string
  - `match`: string
- result: boolean

```feel
contains("foobar", "of")
// false
```

## starts with()

- parameters:
  - `input`: string
  - `match`: string
- result: boolean

```feel
starts with("foobar", "fo")
// true
```

## ends with()

- parameters:
  - `input`: string
  - `match`: string
- result: boolean

```feel
ends with("foobar", "r")
// true
```

## matches()

- parameters:
  - `input`: string
  - `pattern`: string (regular expression)
- result: boolean

```feel
matches("foobar", "^fo*bar")
// true
```

## replace()

- parameters:
  - `input`: string
  - `pattern`: string (regular expression)
  - `replacement`: string (e.g. `$1` returns the first match group)
  - (optional) `flags`: string ("s", "m", "i", "x")
- result: string

```feel
replace("abcd", "(ab)|(a)", "[1=$1][2=$2]")
// "[1=ab][2=]cd"

replace("0123456789", "(\d{3})(\d{3})(\d{4})", "($1) $2-$3")
// "(012) 345-6789"
```

## split()

- parameters:
  - `string`: string
  - `delimiter`: string (regular expression)
- result: list of strings

```feel
split("John Doe", "\s" )
// ["John", "Doe"]

split("a;b;c;;", ";")
// ["a", "b", "c", "", ""]
```

## extract()

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns all matches of the pattern in the given string. Returns an empty list if the pattern doesn't
match.

- parameters:
  - `string`: string
  - `pattern`: string (regular expression)
- result: list of strings

```feel
extract("references are 1234, 1256, 1378", "12[0-9]*")
// ["1234","1256"]
```
