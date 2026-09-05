---
title: "Type Alias: UnassignClientFromGroupData"
sidebar_label: "UnassignClientFromGroupData"
mdx:
  format: md
---

# Type Alias: UnassignClientFromGroupData

```ts
type UnassignClientFromGroupData = object;
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
url: "/groups/{groupId}/clients/{clientId}";
```
