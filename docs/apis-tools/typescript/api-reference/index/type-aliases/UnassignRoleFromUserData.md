---
title: "Type Alias: UnassignRoleFromUserData"
sidebar_label: "UnassignRoleFromUserData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromUserData

```ts
type UnassignRoleFromUserData = object;
```

Defined in: [gen/types.gen.ts:14560](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14560)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:14561](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14561)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14562](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14562)

#### roleId

```ts
roleId: string;
```

The role ID.

#### username

```ts
username: Username;
```

The user username.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:14572](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14572)

---

### url

```ts
url: "/roles/{roleId}/users/{username}";
```

Defined in: [gen/types.gen.ts:14573](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14573)
