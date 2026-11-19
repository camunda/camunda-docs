---
title: "Type Alias: CamundaUserResult"
sidebar_label: "CamundaUserResult"
mdx:
  format: md
---

# Type Alias: CamundaUserResult

```ts
type CamundaUserResult = object;
```

## Properties

### authorizedComponents

```ts
authorizedComponents: string[];
```

The web components the user is authorized to use. When authorizations are disabled for the cluster, this always returns `["*"]`, regardless of the user's actual permissions, since access is not restricted in that case. An anonymous caller of an unprotected API also gets `["*"]`, for the same reason.

---

### c8Links

```ts
c8Links: object;
```

The links to the components in the C8 stack.

#### Index Signature

```ts
[key: string]: string
```

---

### canLogout

```ts
canLogout: boolean;
```

Flag for understanding if the user is able to perform logout.

---

### displayName

```ts
displayName: string | null;
```

The display name of the user.

---

### email

```ts
email: string | null;
```

The email of the user.

---

### groups

```ts
groups: string[];
```

The groups assigned to the user.

---

### isAnonymous

```ts
isAnonymous: boolean;
```

Whether the caller has no identity. Only an unprotected API answers an anonymous caller; a protected API returns `401` instead. When `true`, `username`, `displayName` and `email` are `null` and the lists are empty.

---

### roles

```ts
roles: string[];
```

The roles assigned to the user.

---

### salesPlanType

```ts
salesPlanType: string | null;
```

The plan of the user.

---

### tenants

```ts
tenants: TenantResult[];
```

The tenants the user is a member of.

---

### username

```ts
username: Username | null;
```

The username of the user. `null` when `isAnonymous` is `true`.
