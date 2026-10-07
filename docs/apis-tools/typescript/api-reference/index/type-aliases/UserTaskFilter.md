---
title: "Type Alias: UserTaskFilter"
sidebar_label: "UserTaskFilter"
mdx:
  format: md
---

# Type Alias: UserTaskFilter

```ts
type UserTaskFilter = UserTaskFilterFields & object;
```

User task filter request.

## Type Declaration

### $or?

```ts
optional $or?: UserTaskFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "assignee": "user1",
  "$or": [{ "candidateGroup": "groupA" }, { "candidateUser": "user2" }]
}
```

This matches user tasks that:

- are assigned to _user1_
- and match either:

- `candidateGroup` is _groupA_, or
- `candidateUser` is _user2_

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
