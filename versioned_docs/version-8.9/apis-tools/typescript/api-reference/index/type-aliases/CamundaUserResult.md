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

The web components the user is authorized to use.

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
username: Username;
```

The username of the user.
