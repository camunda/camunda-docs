---
title: "Type Alias: UpdateUserData"
sidebar_label: "UpdateUserData"
mdx:
  format: md
---

# Type Alias: UpdateUserData

```ts
type UpdateUserData = object;
```

## Properties

### body

```ts
body: UserUpdateRequest;
```

---

### path

```ts
path: object;
```

#### username

```ts
username: Username;
```

The username of the user to update.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/users/{username}";
```
