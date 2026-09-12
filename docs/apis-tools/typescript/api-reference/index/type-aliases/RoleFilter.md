---
title: "Type Alias: RoleFilter"
sidebar_label: "RoleFilter"
mdx:
  format: md
---

# Type Alias: RoleFilter

```ts
type RoleFilter = RoleFilterFields & object;
```

Role filter request

## Type Declaration

### $or?

```ts
optional $or?: RoleFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "name": "Admin",
  "$or": [{ "roleId": "role-1" }, { "roleId": "role-2" }]
}
```

This matches roles that:

- have name equal to _Admin_
- and match either:

- `roleId` is _role-1_, or
- `roleId` is _role-2_

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
