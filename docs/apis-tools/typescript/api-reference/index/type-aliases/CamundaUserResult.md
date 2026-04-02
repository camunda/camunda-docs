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

Defined in: [gen/types.gen.ts:501](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L501)

## Properties

### authorizedComponents

```ts
authorizedComponents: string[];
```

Defined in: [gen/types.gen.ts:517](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L517)

The web components the user is authorized to use.

---

### c8Links

```ts
c8Links: object;
```

Defined in: [gen/types.gen.ts:537](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L537)

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

Defined in: [gen/types.gen.ts:543](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L543)

Flag for understanding if the user is able to perform logout.

---

### displayName

```ts
displayName: string | null;
```

Defined in: [gen/types.gen.ts:509](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L509)

The display name of the user.

---

### email

```ts
email: string | null;
```

Defined in: [gen/types.gen.ts:513](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L513)

The email of the user.

---

### groups

```ts
groups: string[];
```

Defined in: [gen/types.gen.ts:525](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L525)

The groups assigned to the user.

---

### roles

```ts
roles: string[];
```

Defined in: [gen/types.gen.ts:529](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L529)

The roles assigned to the user.

---

### salesPlanType

```ts
salesPlanType: string | null;
```

Defined in: [gen/types.gen.ts:533](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L533)

The plan of the user.

---

### tenants

```ts
tenants: TenantResult[];
```

Defined in: [gen/types.gen.ts:521](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L521)

The tenants the user is a member of.

---

### username

```ts
username: Username;
```

Defined in: [gen/types.gen.ts:505](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L505)

The username of the user.
