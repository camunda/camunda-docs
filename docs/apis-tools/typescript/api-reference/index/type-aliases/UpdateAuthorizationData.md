---
title: "Type Alias: UpdateAuthorizationData"
sidebar_label: "UpdateAuthorizationData"
mdx:
  format: md
---

# Type Alias: UpdateAuthorizationData

```ts
type UpdateAuthorizationData = object;
```

## Properties

### body

```ts
body: AuthorizationRequest;
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
