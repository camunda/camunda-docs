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
url: "/groups/{groupId}/clients/search";
```
