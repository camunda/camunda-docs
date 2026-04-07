---
title: "Type Alias: SearchClientsForRoleData"
sidebar_label: "SearchClientsForRoleData"
mdx:
  format: md
---

# Type Alias: SearchClientsForRoleData

```ts
type SearchClientsForRoleData = object;
```

Defined in: [gen/types.gen.ts:14014](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14014)

## Properties

### body?

```ts
optional body?: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:14015](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14015)

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

Defined in: [gen/types.gen.ts:14027](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14027)

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

Defined in: [gen/types.gen.ts:14033](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14033)

---

### url

```ts
url: "/roles/{roleId}/clients/search";
```

Defined in: [gen/types.gen.ts:14034](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14034)
