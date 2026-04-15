---
title: "Type Alias: GetAuthorizationData"
sidebar_label: "GetAuthorizationData"
mdx:
  format: md
---

# Type Alias: GetAuthorizationData

```ts
type GetAuthorizationData = object;
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

The key of the authorization to get.

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
