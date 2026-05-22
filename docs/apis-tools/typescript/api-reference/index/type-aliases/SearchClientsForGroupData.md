---
title: "Type Alias: SearchClientsForGroupData"
sidebar_label: "SearchClientsForGroupData"
mdx:
  format: md
---

# Type Alias: SearchClientsForGroupData

```ts
type SearchClientsForGroupData = object;
```

## Properties

### body?

```ts
optional body?: GroupClientSearchQueryRequest;
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
url: "/groups/{groupId}/clients/search";
```
