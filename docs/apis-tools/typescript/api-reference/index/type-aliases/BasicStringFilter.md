---
title: "Type Alias: BasicStringFilter"
sidebar_label: "BasicStringFilter"
mdx:
  format: md
---

# Type Alias: BasicStringFilter

```ts
type BasicStringFilter = object;
```

Defined in: [gen/types.gen.ts:2785](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2785)

Advanced filter

Basic advanced string filter.

## Properties

### $eq?

```ts
optional $eq?: string;
```

Defined in: [gen/types.gen.ts:2789](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2789)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:2797](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2797)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: string[];
```

Defined in: [gen/types.gen.ts:2801](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2801)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: string;
```

Defined in: [gen/types.gen.ts:2793](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2793)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: string[];
```

Defined in: [gen/types.gen.ts:2805](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2805)

Checks if the property matches none of the provided values.
