---
title: "Type Alias: AdvancedBatchOperationStateFilter"
sidebar_label: "AdvancedBatchOperationStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedBatchOperationStateFilter

```ts
type AdvancedBatchOperationStateFilter = object;
```

Defined in: [gen/types.gen.ts:1082](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1082)

Advanced filter

Advanced BatchOperationStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:1086](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1086)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:1094](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1094)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: BatchOperationStateEnum[];
```

Defined in: [gen/types.gen.ts:1098](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1098)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:1099](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1099)

---

### $neq?

```ts
optional $neq?: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:1090](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1090)

Checks for inequality with the provided value.
