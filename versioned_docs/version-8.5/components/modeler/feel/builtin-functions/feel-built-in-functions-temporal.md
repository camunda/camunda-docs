---
id: feel-built-in-functions-temporal
title: Temporal functions
description: "This document outlines built-in temporal functions and examples."
---

import MarkerCamundaExtension from "@site/src/mdx/MarkerCamundaExtension";

## now()

Returns the current date and time including the timezone.

**Function signature**

```feel
now(): date and time
```

**Examples**

```feel
now()
// date and time("2020-07-31T14:27:30@Europe/Berlin")
```

## today()

Returns the current date.

**Function signature**

```feel
today(): date
```

**Examples**

```feel
today()
// date("2020-07-31")
```

## day of week(date)

Returns the day of the week according to the Gregorian calendar. Note that it always returns the English name of the day.

**Function signature**

```feel
day of week(date: date): string
```

```feel
day of week(date: date and time): string
```

**Examples**

```feel
day of week(date("2019-09-17"))
// "Tuesday"

day of week(date and time("2019-09-17T12:00:00"))
// "Tuesday"
```

## day of year(date)

Returns the Gregorian number of the day within the year.

**Function signature**

```feel
day of year(date: date): number
```

```feel
day of year(date: date and time): number
```

**Examples**

```feel
day of year(date("2019-09-17"))
// 260

day of year(date and time("2019-09-17T12:00:00"))
// 260
```

## week of year(date)

Returns the Gregorian number of the week within the year, according to ISO 8601.

**Function signature**

```feel
week of year(date: date): number
```

```feel
week of year(date: date and time): number
```

**Examples**

```feel
week of year(date("2019-09-17"))
// 38

week of year(date and time("2019-09-17T12:00:00"))
// 38
```

## month of year(date)

Returns the month of the year according to the Gregorian calendar. Note that it always returns the English name of the month.

**Function signature**

```feel
month of year(date: date): string
```

```feel
month of year(date: date and time): string
```

**Examples**

```feel
month of year(date("2019-09-17"))
// "September"

month of year(date and time("2019-09-17T12:00:00"))
// "September"
```

## abs(n)

Returns the absolute value of a given duration.

**Function signature**

```feel
abs(n: days and time duration): days and time duration
```

```feel
abs(n: years and months duration): years and months duration
```

**Examples**

```feel
abs(duration("-PT5H"))
// "duration("PT5H")"

abs(duration("PT5H"))
// "duration("PT5H")"

abs(duration("-P2M"))
// duration("P2M")
```

## last day of month(date)

<MarkerCamundaExtension></MarkerCamundaExtension>

Takes the month of the given date or date-time value and returns the last day of this month.

**Function signature**

```feel
last day of month(date: date): date
```

```feel
last day of month(date: date and time): date
```

**Examples**

```feel
last day of month(date("2022-10-01"))
// date("2022-10-31"))

last day of month(date and time("2022-10-16T12:00:00"))
// date("2022-10-31"))
```
