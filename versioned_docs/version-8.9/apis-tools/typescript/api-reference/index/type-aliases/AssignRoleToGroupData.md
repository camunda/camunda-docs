---
title: "Type Alias: AssignRoleToGroupData"
sidebar_label: "AssignRoleToGroupData"
mdx:
  format: md
---

# Type Alias: AssignRoleToGroupData

```ts
type AssignRoleToGroupData = object;
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
