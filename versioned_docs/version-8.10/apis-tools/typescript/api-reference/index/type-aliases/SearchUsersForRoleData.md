---
title: "Type Alias: SearchUsersForRoleData"
sidebar_label: "SearchUsersForRoleData"
mdx:
  format: md
---

# Type Alias: SearchUsersForRoleData

```ts
type SearchUsersForRoleData = object;
```

## Properties

### body?

```ts
optional body?: RoleUserSearchQueryRequest;
```

---

### path

```ts
path: object;
```

#### roleId

```ts
roleId: RoleId;
```

The role ID.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/roles/{roleId}/users/search";
```
