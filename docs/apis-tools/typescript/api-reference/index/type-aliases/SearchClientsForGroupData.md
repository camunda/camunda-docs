---
title: "Type Alias: SearchClientsForGroupData"
sidebar_label: "SearchClientsForGroupData"
mdx:
  format: md
---

# Type Alias: SearchClientsForGroupData

```ts
type SearchClientsForGroupData = object;
```

Defined in: [gen/types.gen.ts:11028](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11028)

## Properties

### body?

```ts
optional body?: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:11029](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11029)

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

Defined in: [gen/types.gen.ts:11041](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11041)

#### groupId

```ts
groupId: string;
```

The group ID.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:11047](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11047)

---

### url

```ts
url: "/groups/{groupId}/clients/search";
```

Defined in: [gen/types.gen.ts:11048](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11048)
