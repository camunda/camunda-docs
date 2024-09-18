---
id: feel-built-in-functions-conversion
title: Conversion functions
description: "This document outlines conversion functions and a few examples."
---

import MarkerCamundaExtension from "@site/src/mdx/MarkerCamundaExtension";

Convert a value into a different type.

## string(from)

Returns the given value as a string representation.

**Function signature**

```feel
string(from: Any): string
```

**Examples**

```feel
string(1.1)
// "1.1"

string(date("2012-12-25"))
// "2012-12-25"
```

## number(from)

Parses the given string to a number.

Returns `null` if the string is not a number.

**Function signature**

```feel
number(from: string): number
```

**Examples**

```feel
number("1500.5")
// 1500.5
```

## context(entries)

Constructs a context of the given list of key-value pairs. It is the reverse function to [get entries()](feel-built-in-functions-context.md#get-entriescontext).

Each key-value pair must be a context with two entries: `key` and `value`. The entry with name `key` must have a value of the type `string`.

It might override context entries if the keys are equal. The entries are overridden in the same order as the contexts in the given list.

Returns `null` if one of the entries is not a context or if a context doesn't contain the required entries.

**Function signature**

```feel
context(entries: list<context>): context
```

**Examples**

```feel
context([{"key":"a", "value":1}, {"key":"b", "value":2}])
// {a:1, b:2}
```

## date(from)

Returns a date from the given value.

Returns `null` if the string is not a valid calendar date. For example, `"2024-06-31"` is invalid because June has
only 30 days.

**Function signature**

```feel
date(from: string): date
```

Parses the given string into a date.

```feel
date(from: date and time): date
```

Extracts the date component from the given date and time.

**Examples**

```feel
date("2018-04-29")
// date("2018-04-29")

date(date and time("2012-12-25T11:00:00"))
// date("2012-12-25")
```

## date(year, month, day)

Returns a date from the given components.

Returns `null` if the components don't represent a valid calendar date. For example, `2024,6,31` is invalid because
June has only 30 days.

**Function signature**

```feel
date(year: number, month: number, day: number): date
```

**Examples**

```feel
date(2012, 12, 25)
// date("2012-12-25")
```

## time(from)

Returns a time from the given value.

**Function signature**

```feel
time(from: string): time
```

Parses the given string into a time.

```feel
time(from: date and time): time
```

Extracts the time component from the given date and time.

**Examples**

```feel
time("12:00:00")
// time("12:00:00")

time(date and time("2012-12-25T11:00:00"))
// time("11:00:00")
```

## time(hour, minute, second)

Returns a time from the given components.

**Function signature**

```feel
time(hour: number, minute: number, second: number): time
```

**Examples**

```feel
time(23, 59, 0)
// time("23:59:00")
```

## time(hour, minute, second, offset)

Returns a time from the given components, including a timezone offset.

**Function signature**

```feel
time(hour: number, minute: number, second: number, offset: days and time duration): time
```

**Examples**

```feel
time(14, 30, 0, duration("PT1H"))
// time("14:30:00+01:00")
```

## date and time(from)

Parses the given string into a date and time.

Returns `null` if the string is not a valid calendar date. For example, `"2024-06-31T10:00:00"` is invalid because
June has only 30 days.

**Function signature**

```feel
date and time(from: string): date and time
```

**Examples**

```feel
date and time("2018-04-29T09:30:00")
// date and time("2018-04-29T09:30:00")
```

## date and time(date, time)

Returns a date and time from the given components.

**Function signature**

```feel
date and time(date: date, time: time): date and time
```

```feel
date and time(date: date and time, time: time): date and time
```

Returns a date and time value that consists of the date component of `date` combined with `time`.

**Examples**

```feel
date and time(date("2012-12-24"),time("T23:59:00"))
// date and time("2012-12-24T23:59:00")

date and time(date and time("2012-12-25T11:00:00"),time("T23:59:00"))
// date and time("2012-12-25T23:59:00")
```

## date and time(date, timezone)

<MarkerCamundaExtension></MarkerCamundaExtension>

Returns the given date and time value at the given timezone.

If `date` has a different timezone than `timezone` then it adjusts the time to match the local time of `timezone`.

**Function signature**

```feel
date and time(date: date and time, timezone: string): date and time
```

**Examples**

```feel
date and time(@"2020-07-31T14:27:30@Europe/Berlin", "America/Los_Angeles")
// date and time("2020-07-31T05:27:30@America/Los_Angeles")

date and time(@"2020-07-31T14:27:30", "Z")
// date and time("2020-07-31T12:27:30Z")
```

## duration(from)

Parses the given string into a duration. The duration is either a days and time duration or a years and months duration.

**Function signature**

```feel
duration(from: string): days and time duration
```

```feel
duration(from: string): years and months duration
```

**Examples**

```feel
duration("P5D")
// duration("P5D")

duration("P32Y")
// duration("P32Y")
```

## years and months duration(from, to)

Returns the years and months duration between `from` and `to`.

**Function signature**

```feel
years and months duration(from: date, to: date): years and months duration
```

**Examples**

```feel
years and months duration(date("2011-12-22"), date("2013-08-24"))
// duration("P1Y8M")
```
