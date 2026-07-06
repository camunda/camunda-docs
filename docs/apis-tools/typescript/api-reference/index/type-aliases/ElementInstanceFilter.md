---
title: "Type Alias: ElementInstanceFilter"
sidebar_label: "ElementInstanceFilter"
mdx:
  format: md
---

# Type Alias: ElementInstanceFilter

```ts
type ElementInstanceFilter = ElementInstanceFilterFields & object;
```

Element instance search filter.

## Type Declaration

### $or?

```ts
optional $or?: ElementInstanceFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "processInstanceKey": "2251799813685323",
  "$or": [
    { "elementName": { "$like": "*Order*" } },
    { "elementId": { "$like": "*Order*" } }
  ]
}
```

This matches element instances scoped to the given process instance whose:

- `elementName` contains _Order_, or
- `elementId` contains _Order_

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
