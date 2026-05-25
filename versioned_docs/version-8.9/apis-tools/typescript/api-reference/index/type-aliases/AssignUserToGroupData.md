---
title: "Type Alias: AssignUserToGroupData"
sidebar_label: "AssignUserToGroupData"
mdx:
  format: md
---

# Type Alias: AssignUserToGroupData

```ts
type AssignUserToGroupData = object;
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

#### groupId

```ts
groupId: string;
```

The group ID.

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
url: "/groups/{groupId}/users/{username}";
```
