---
title: "Type Alias: SearchUsersForRoleData"
sidebar_label: "SearchUsersForRoleData"
mdx:
  format: md
---

# Type Alias: SearchUsersForRoleData

```ts
type SearchUsersForRoleData = object;
```

Defined in: [gen/types.gen.ts:14496](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14496)

## Properties

### body?

```ts
optional body?: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:14497](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14497)

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

Defined in: [gen/types.gen.ts:14509](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14509)

#### roleId

```ts
roleId: string;
```

The role ID.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:14515](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14515)

---

### url

```ts
url: "/roles/{roleId}/users/search";
```

Defined in: [gen/types.gen.ts:14516](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14516)
