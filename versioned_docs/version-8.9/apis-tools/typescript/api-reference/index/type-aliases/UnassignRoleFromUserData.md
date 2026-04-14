---
title: "Type Alias: UnassignRoleFromUserData"
sidebar_label: "UnassignRoleFromUserData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromUserData

```ts
type UnassignRoleFromUserData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### roleId

```ts
roleId: string;
```

The role ID.

#### username

```ts
username: Username;
```

The user username.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/roles/{roleId}/users/{username}";
```
