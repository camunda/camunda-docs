---
title: "Type Alias: AssignRoleToClientData"
sidebar_label: "AssignRoleToClientData"
mdx:
  format: md
---

# Type Alias: AssignRoleToClientData

```ts
type AssignRoleToClientData = object;
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

#### clientId

```ts
clientId: ClientId;
```

The client ID.

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
url: "/roles/{roleId}/clients/{clientId}";
```
