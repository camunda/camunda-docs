---
title: "Type Alias: UnassignRoleFromClientData"
sidebar_label: "UnassignRoleFromClientData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromClientData

```ts
type UnassignRoleFromClientData = object;
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
clientId: string;
```

The client ID.

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
url: "/roles/{roleId}/clients/{clientId}";
```
