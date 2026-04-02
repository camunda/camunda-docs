---
title: "Type Alias: AdvancedBatchOperationItemStateFilter"
sidebar_label: "AdvancedBatchOperationItemStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedBatchOperationItemStateFilter

```ts
type AdvancedBatchOperationItemStateFilter = object;
```

Defined in: [gen/types.gen.ts:1112](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1112)

Advanced filter

Advanced BatchOperationItemStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: BatchOperationItemStateEnum;
```

Defined in: [gen/types.gen.ts:1116](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1116)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:1124](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1124)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: BatchOperationItemStateEnum[];
```

Defined in: [gen/types.gen.ts:1128](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1128)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:1129](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1129)

---

### $neq?

```ts
optional $neq?: BatchOperationItemStateEnum;
```

Defined in: [gen/types.gen.ts:1120](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1120)

Checks for inequality with the provided value.
