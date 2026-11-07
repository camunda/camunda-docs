---
title: "Type Alias: ClockAddRequest"
sidebar_label: "ClockAddRequest"
mdx:
  format: md
---

# Type Alias: ClockAddRequest

```ts
type ClockAddRequest = object;
```

## Properties

### offset

```ts
offset: string;
```

The time to add to the clock, as an ISO 8601 duration in days, hours, minutes, and
seconds (for example `PT1H` for one hour or `P1D` for one day). Use a negative
duration such as `-PT1H` to move the clock backward. The request is rejected if the
new time would be before 1970-01-01T00:00:00Z.
