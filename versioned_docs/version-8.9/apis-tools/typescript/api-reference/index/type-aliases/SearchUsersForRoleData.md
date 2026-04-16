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
optional body?: SearchQueryRequest & object;
```

#### Type Declaration

##### sort?

```ts
optional sort?: object[];
```

Sort field criteria.

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
