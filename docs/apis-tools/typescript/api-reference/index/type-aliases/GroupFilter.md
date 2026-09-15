---
title: "Type Alias: GroupFilter"
sidebar_label: "GroupFilter"
mdx:
  format: md
---

# Type Alias: GroupFilter

```ts
type GroupFilter = GroupFilterFields & object;
```

Group filter request

## Type Declaration

### $or?

```ts
optional $or?: GroupFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "$or": [{ "groupId": "group-1" }, { "groupId": "group-2" }]
}
```

This matches groups whose `groupId` is _group-1_ or _group-2_.

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
