---
title: "Type Alias: DeleteAuthorizationData"
sidebar_label: "DeleteAuthorizationData"
mdx:
  format: md
---

# Type Alias: DeleteAuthorizationData

```ts
type DeleteAuthorizationData = object;
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

#### authorizationKey

```ts
authorizationKey: AuthorizationKey;
```

The key of the authorization to delete.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/authorizations/{authorizationKey}";
```
