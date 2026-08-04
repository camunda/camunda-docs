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
optional body?: GroupUserSearchQueryRequest;
```

---

### path

```ts
path: object;
```

#### groupId

```ts
groupId: GroupId;
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
