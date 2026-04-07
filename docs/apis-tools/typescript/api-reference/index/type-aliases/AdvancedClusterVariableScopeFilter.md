---
title: "Type Alias: AdvancedClusterVariableScopeFilter"
sidebar_label: "AdvancedClusterVariableScopeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedClusterVariableScopeFilter

```ts
type AdvancedClusterVariableScopeFilter = object;
```

Defined in: [gen/types.gen.ts:1261](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1261)

Advanced filter

Advanced ClusterVariableScopeEnum filter.

## Properties

### $eq?

```ts
optional $eq?: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1265](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1265)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:1273](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1273)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ClusterVariableScopeEnum[];
```

Defined in: [gen/types.gen.ts:1277](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1277)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:1278](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1278)

---

### $neq?

```ts
optional $neq?: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1269](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1269)

Checks for inequality with the provided value.
