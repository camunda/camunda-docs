---
title: "Type Alias: SearchUsersForGroupData"
sidebar_label: "SearchUsersForGroupData"
mdx:
  format: md
---

# Type Alias: SearchUsersForGroupData

```ts
type SearchUsersForGroupData = object;
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

#### groupId

```ts
groupId: string;
```

The group ID.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/groups/{groupId}/users/search";
```
