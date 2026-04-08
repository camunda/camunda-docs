---
title: "Type Alias: DeleteResourceData"
sidebar_label: "DeleteResourceData"
mdx:
  format: md
---

# Type Alias: DeleteResourceData

```ts
type DeleteResourceData = object;
```

Defined in: [gen/types.gen.ts:13757](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13757)

## Properties

### body?

```ts
optional body?: DeleteResourceRequest;
```

Defined in: [gen/types.gen.ts:13758](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13758)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13759](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13759)

#### resourceKey

```ts
resourceKey: ResourceKey;
```

The key of the resource to delete.
This can be the key of a process definition, the key of a decision requirements
definition or the key of a form definition

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13768](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13768)

---

### url

```ts
url: "/resources/{resourceKey}/deletion";
```

Defined in: [gen/types.gen.ts:13769](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13769)
