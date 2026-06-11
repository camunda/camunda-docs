---
title: "Type Alias: SearchClientsForRoleData"
sidebar_label: "SearchClientsForRoleData"
mdx:
  format: md
---

# Type Alias: SearchClientsForRoleData

```ts
type SearchClientsForRoleData = object;
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
url: "/roles/{roleId}/clients/search";
```
