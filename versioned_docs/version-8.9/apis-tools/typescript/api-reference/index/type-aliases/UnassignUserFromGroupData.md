---
title: "Type Alias: UnassignUserFromGroupData"
sidebar_label: "UnassignUserFromGroupData"
mdx:
  format: md
---

# Type Alias: UnassignUserFromGroupData

```ts
type UnassignUserFromGroupData = object;
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
