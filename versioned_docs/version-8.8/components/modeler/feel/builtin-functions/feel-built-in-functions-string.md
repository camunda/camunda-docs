---
id: feel-built-in-functions-string
title: String functions
description: "This document outlines built-in string functions and examples."
---

import MarkerCamundaExtension from "@site/src/mdx/MarkerCamundaExtension";

## substring(string, start position)

Returns a substring of the given value starting at `start position`.

**Function signature**

```feel
substring(string: string, start position: number): string
```

The `start position` starts at the index `1`. The last position is `-1`.

**Examples**

```feel
substring("foobar", 3)
// "obar"

substring("foobar", -2)
// "ar"
```

## substring(string, start position, length)

Returns a substring of the given value, starting at `start position` with the given `length`. If `length` is greater than
the remaining characters of the value, it returns all characters from `start position` until the end.

**Function signature**

```feel
substring(string: string, start position: number, length: number): string
```

The `start position` starts at the index `1`. The last position is `-1`.

**Examples**

```feel
substring("foobar", 3, 3)
// "oba"

substring("foobar", -3, 2)
// "ba"

substring("foobar", 3, 10)
// "obar"
```

## string length(string)

Returns the number of characters in the given value.

**Function signature**

```feel
string length(string: string): number
```

**Examples**

```feel
string length("foo")
// 3
```

## upper case(string)

Returns the given value with all characters are uppercase.

**Function signature**

```feel
upper case(string: string): string
```

**Examples**

```feel
upper case("aBc4")
// "ABC4"
```

## lower case(string)

Returns the given value with all characters are lowercase.

**Function signature**

```feel
lower case(string: string): string
```

**Examples**

```feel
lower case("aBc4")
// "abc4"
```

## substring before(string, match)

Returns a substring of the given value that contains all characters before `match`.

**Function signature**

```feel
substring before(string: string, match: string): string
```

**Examples**

```feel
substring before("foobar", "bar")
// "foo"
```

## substring after(string, match)

Returns a substring of the given value that contains all characters after `match`.

**Function signature**

```feel
substring after(string: string, match: string): string
```

**Examples**

```feel
substring after("foobar", "ob")
// "ar"
```

## contains(string, match)

Returns `true` if the given value contains the substring `match`. Otherwise, returns `false`.

**Function signature**

```feel
contains(string: string, match: string): boolean
```

**Examples**

```feel
contains("foobar", "of")
// false
```

## starts with(string, match)

Returns `true` if the given value starts with the substring `match`. Otherwise, returns `false`.

**Function signature**

```feel
starts with(string: string, match: string): boolean
```

**Examples**

```feel
starts with("foobar", "fo")
// true
```

## ends with(string, match)

Returns `true` if the given value ends with the substring `match`. Otherwise, returns `false`.

**Function signature**

```feel
ends with(string: string, match: string): boolean
```

**Examples**

```feel
ends with("foobar", "r")
// true
```

## matches(input, pattern)

Returns `true` if the given value matches the `pattern`. Otherwise, returns `false`.

**Function signature**

```feel
matches(input: string, pattern: string): boolean
```

The `pattern` is a string that contains a regular expression.

**Examples**

```feel
matches("foobar", "^fo*bar")
// true
```

## matches(input, pattern, flags)

Returns `true` if the given value matches the `pattern`. Otherwise, returns `false`.

**Function signature**

```feel
matches(input: string, pattern: string, flags: string): boolean
```

The `pattern` is a string that contains a regular expression.

The `flags` can contain one or more of the following characters:

- `s` (dot-all)
- `m` (multi-line)
- `i` (case insensitive)
- `x` (comments)

**Examples**

```feel
matches("FooBar", "foo", "i")
// true
```

## replace(input, pattern, replacement)

Returns the resulting string after replacing all occurrences of `pattern` with `replacement`.

**Function signature**

```feel
replace(input: string, pattern: string, replacement: string): string
```

The `pattern` is a string that contains a regular expression.

The `replacement` can access the match groups by using `$` and the number of the group, for example,
`$1` to access the first group.

**Examples**

```feel
replace("abcd", "(ab)|(a)", "[1=$1][2=$2]")
// "[1=ab][2=]cd"

replace("0123456789", "(\d{3})(\d{3})(\d{4})", "($1) $2-$3")
// "(012) 345-6789"
```

## replace(input, pattern, replacement, flags)

Returns the resulting string after replacing all occurrences of `pattern` with `replacement`.

**Function signature**

```feel
replace(input: string, pattern: string, replacement: string, flags: string): string
```

The `pattern` is a string that contains a regular expression.

The `replacement` can access the match groups by using `$` and the number of the group, for example,
`$1` to access the first group.

The `flags` can contain one or more of the following characters:

- `s` (dot-all)
- `m` (multi-line)
- `i` (case insensitive)
- `x` (comments)

**Examples**

```feel
replace("How do you feel?", "Feel", "FEEL", "i")
// "How do you FEEL?"
```

## split(string, delimiter)

Splits the given value into a list of substrings, breaking at each occurrence of the `delimiter` pattern.

**Function signature**

```feel
split(string: string, delimiter: string): list<string>
```

The `delimiter` is a string that contains a regular expression.

**Examples**

```feel
split("John Doe", "\s" )
// ["John", "Doe"]

split("a;b;c;;", ";")
// ["a", "b", "c", "", ""]
```

## extract(string, pattern)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns all matches of the pattern in the given string. Returns an empty list if the pattern doesn't
match.

**Function signature**

```feel
extract(string: string, pattern: string): list<string>
```

The `pattern` is a string that contains a regular expression.

**Examples**

```feel
extract("references are 1234, 1256, 1378", "12[0-9]*")
// ["1234","1256"]
```

## trim(string)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns the given string without leading and trailing spaces.

**Function signature**

```feel
trim(string: string): string
```

**Examples**

```feel
trim("  hello world  ")
// "hello world"

trim("hello   world ")
// "hello   world"
```

## uuid()

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns a UUID (Universally Unique Identifier) with 36 characters.

**Function signature**

```feel
uuid(): string
```

**Examples**

```feel
uuid()
// "7793aab1-d761-4d38-916b-b7270e309894"
```

## to base64(value)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns the given string encoded in Base64 format.

**Function signature**

```feel
to base64(value: string): string
```

**Examples**

```feel
to base64("FEEL")
// "RkVFTA=="
```

## is blank(string)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns `true` if the given string is blank (empty or contains only whitespaces).

**Function signature**

```feel
is blank(string: string): boolean
```

**Examples**

```feel
is blank("")
// true

is blank(" ")
// true

is blank("hello world")
// false
```
