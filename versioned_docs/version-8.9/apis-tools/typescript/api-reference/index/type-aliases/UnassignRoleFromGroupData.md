---
title: "Type Alias: UnassignRoleFromGroupData"
sidebar_label: "UnassignRoleFromGroupData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromGroupData

```ts
type UnassignRoleFromGroupData = object;
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

#### roleId

```ts
roleId: string;
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
url: "/roles/{roleId}/groups/{groupId}";
```
