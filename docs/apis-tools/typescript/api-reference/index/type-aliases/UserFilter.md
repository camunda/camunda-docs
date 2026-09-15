---
title: "Type Alias: UserFilter"
sidebar_label: "UserFilter"
mdx:
  format: md
---

# Type Alias: UserFilter

```ts
type UserFilter = UserFilterFields & object;
```

User search filter.

## Type Declaration

### $or?

```ts
optional $or?: UserFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "$or": [{ "username": "user-1" }, { "username": "user-2" }]
}
```

This matches users whose `username` is _user-1_ or _user-2_.

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
